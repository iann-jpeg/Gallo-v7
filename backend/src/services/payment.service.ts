import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePaymentDto, PaymentCallbackDto } from '../config/payment.dto';

const prisma = new PrismaClient();

@Injectable()
export class PaymentService {
  async handlePaystackCallback(callbackData: any, signature?: string) {
    try {
      // Verify webhook signature for security (optional but recommended)
      const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;
      if (webhookSecret && signature) {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha512', webhookSecret).update(JSON.stringify(callbackData)).digest('hex');
        if (hash !== signature) {
          throw new BadRequestException('Invalid webhook signature');
        }
      }

      console.log('Paystack callback received:', JSON.stringify(callbackData, null, 2));
      
      // Paystack sends webhook events with event type and data
      const event = callbackData.event;
      const data = callbackData.data;
      
      if (event !== 'charge.success' && event !== 'charge.failed') {
        return {
          success: true,
          message: 'Event type not handled',
          event
        };
      }

      const reference = data?.reference;
      const status = data?.status;
      
      if (!reference) {
        throw new BadRequestException('Missing transaction reference in callback');
      }

      const payment = await prisma.payment.findFirst({ 
        where: { transactionId: reference } 
      });
      
      if (!payment) {
        console.warn(`Payment not found for reference: ${reference}`);
        throw new NotFoundException('Payment not found');
      }

      const finalStatus = status === 'success' ? 'completed' : 'failed';
      
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: finalStatus,
          metadata: {
            ...payment.metadata as any,
            paystackCallback: callbackData,
            callbackReceivedAt: new Date().toISOString(),
            amount_paid: data?.amount ? data.amount / 100 : null, // Convert from kobo
            paystack_reference: data?.reference,
            gateway_response: data?.gateway_response
          }
        }
      });

      console.log(`Payment ${reference} updated to status: ${finalStatus}`);

      return {
        success: true,
        message: 'Paystack callback processed successfully',
        data: {
          id: updatedPayment.id,
          transactionId: updatedPayment.transactionId,
          status: updatedPayment.status
        }
      };
    } catch (error: any) {
      console.error('Error handling Paystack callback:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to process Paystack callback');
    }
  }

  async findAll(page: number = 1, limit: number = 10, status?: string) {
    try {
      const skip = (page - 1) * limit;
      const where = status ? { status } : {};

      const [payments, total] = await Promise.all([
        prisma.payment.findMany({
          skip,
          take: limit,
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }),
        prisma.payment.count({ where })
      ]);

      return {
        data: payments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw new BadRequestException('Failed to fetch payments');
    }
  }

  async findOne(id: number, user?: any) {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id },
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      });

      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      // If not admin, only return payment if it belongs to the user
      if (user && user.role !== 'ADMIN' && payment.userId !== user.id) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      return payment;
    } catch (error) {
      console.error('Error fetching payment:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch payment');
    }
  }

  async create(data: CreatePaymentDto) {
    try {
      // Generate transaction ID
      const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      let payment;
      
      // M-PESA Integration
      if (data.paymentMethod === 'mpesa') {
        const mpesaResult = await this.initiateMpesaStkPush(data.phoneNumber || '', data.amount, transactionId);
        payment = await prisma.payment.create({
          data: {
            ...data,
            transactionId,
            status: mpesaResult.success ? 'processing' : 'failed',
            metadata: mpesaResult
          }
        });
      } else if (data.paymentMethod === 'paystack') {
        const paystackResult = await this.initiatePaystackPayment(data.amount, transactionId, data.email);
        payment = await prisma.payment.create({
          data: {
            ...data,
            transactionId,
            status: paystackResult.success ? 'processing' : 'failed',
            metadata: paystackResult
          }
        });
      } else {
        // Default case for other payment methods
        payment = await prisma.payment.create({
          data: {
            ...data,
            transactionId,
            status: 'pending'
          }
        });
      }

      return {
        success: true,
        message: 'Payment initiated successfully',
        data: payment ? {
          id: payment.id,
          transactionId: payment.transactionId,
          status: payment.status,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          metadata: payment.metadata
        } : null
      };
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new BadRequestException('Failed to initiate payment');
    }
  }

  async initiatePaystackPayment(amount: number, transactionId: string, email: string) {
    const apiUrl = process.env.PAYSTACK_API_URL || 'https://api.paystack.co';
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const callbackUrl = process.env.PAYSTACK_CALLBACK_URL;
    
    if (!secretKey) {
      return { success: false, message: 'Paystack secret key not configured', error: 'Missing API credentials' };
    }

    const axios = require('axios');
    
    try {
      const response = await axios.post(
        `${apiUrl}/transaction/initialize`,
        {
          email,
          amount: amount * 100, // Paystack expects amount in kobo
          reference: transactionId,
          callback_url: callbackUrl,
          currency: 'USD', // Since diaspora payments are in USD
          metadata: {
            transactionId,
            custom_fields: [
              {
                display_name: "Transaction ID",
                variable_name: "transaction_id",
                value: transactionId
              }
            ]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.status) {
        return {
          success: true,
          message: 'Paystack payment initialized successfully',
          data: response.data.data,
          authorization_url: response.data.data.authorization_url,
          access_code: response.data.data.access_code,
          reference: response.data.data.reference
        };
      } else {
        return { 
          success: false, 
          message: 'Paystack payment initialization failed', 
          error: response.data.message || 'Unknown error' 
        };
      }
    } catch (error: any) {
      console.error('Paystack payment error:', error.response?.data || error.message);
      return { 
        success: false, 
        message: 'Paystack payment failed', 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  // Verify payment status directly from Paystack
  async verifyPaystackPayment(reference: string) {
    const apiUrl = process.env.PAYSTACK_API_URL || 'https://api.paystack.co';
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secretKey) {
      return { success: false, message: 'Paystack secret key not configured' };
    }

    const axios = require('axios');
    
    try {
      const response = await axios.get(
        `${apiUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.status) {
        return {
          success: true,
          message: 'Payment verification successful',
          data: response.data.data,
          status: response.data.data.status
        };
      } else {
        return { 
          success: false, 
          message: 'Payment verification failed', 
          error: response.data.message || 'Unknown error' 
        };
      }
    } catch (error: any) {
      console.error('Paystack verification error:', error.response?.data || error.message);
      return { 
        success: false, 
        message: 'Payment verification failed', 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  // M-PESA STK Push API Integration
  async initiateMpesaStkPush(phone: string, amount: number, transactionId: string) {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;
    const environment = process.env.MPESA_ENVIRONMENT || 'production';
    const axios = require('axios');
    
    try {
      // Step 1: Get OAuth token
      const oauthUrl = environment === 'production'
        ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
      const oauthResponse = await axios.get(oauthUrl, {
        auth: {
          username: consumerKey,
          password: consumerSecret,
        },
      });
      const accessToken = oauthResponse.data.access_token;

      // Step 2: Prepare STK Push payload
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:TZ.]/g, '')
        .slice(0, 14);
      const passwordStr = (shortcode || '') + (passkey || '') + timestamp;
      const password = Buffer.from(passwordStr).toString('base64');

      const stkPushUrl = environment === 'production'
        ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

      const payload = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: transactionId,
        TransactionDesc: 'Payment for services',
      };

      // Step 3: Send STK Push request
      const stkResponse = await axios.post(stkPushUrl, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Step 4: Return response
      return {
        success: true,
        message: 'STK Push sent',
        mpesaCheckoutId: stkResponse.data.CheckoutRequestID,
        merchantRequestId: stkResponse.data.MerchantRequestID,
        response: stkResponse.data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'M-PESA STK Push failed',
        error: (error as Error).message,
      };
    }
  }

  async processPayment(id: number) {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id }
      });

      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      if (payment.status !== 'pending') {
        throw new BadRequestException('Payment has already been processed');
      }

      // Update status to processing
      await prisma.payment.update({
        where: { id },
        data: { status: 'processing' }
      });

      // Simulate payment processing based on payment method
      const isSuccess = await this.simulatePaymentProcessing(payment.paymentMethod);

      const finalStatus = isSuccess ? 'completed' : 'failed';
      
      const updatedPayment = await prisma.payment.update({
        where: { id },
        data: { 
          status: finalStatus,
          metadata: {
            processedAt: new Date(),
            simulatedResult: isSuccess ? 'success' : 'failed'
          }
        }
      });

      return {
        success: true,
        message: `Payment ${finalStatus}`,
        data: updatedPayment
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to process payment');
    }
  }

  private async simulatePaymentProcessing(paymentMethod: string): Promise<boolean> {
    // Simulate different success rates for different payment methods
    const delay = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, delay));

    switch (paymentMethod) {
      case 'mpesa':
        return Math.random() > 0.1; // 90% success rate
      case 'card':
        return Math.random() > 0.15; // 85% success rate
      case 'paystack':
        return Math.random() > 0.05; // 95% success rate
      default:
        return Math.random() > 0.2; // 80% success rate
    }
  }

  async handleMpesaCallback(callbackData: PaymentCallbackDto) {
    return this.handlePaymentCallback(callbackData, 'mpesa');
  }

  async handlePaypalCallback(callbackData: PaymentCallbackDto) {
    return this.handlePaymentCallback(callbackData, 'paypal');
  }

  async handleCardCallback(callbackData: PaymentCallbackDto) {
    return this.handlePaymentCallback(callbackData, 'card');
  }

  private async handlePaymentCallback(callbackData: PaymentCallbackDto, expectedMethod: string) {
    try {
      const payment = await prisma.payment.findFirst({
        where: { transactionId: callbackData.transactionId }
      });

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      if (payment.paymentMethod !== expectedMethod) {
        throw new BadRequestException('Payment method mismatch');
      }

      const status = callbackData.status === 'success' ? 'completed' : 'failed';
      
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status,
          metadata: {
            ...payment.metadata as any,
            callbackData,
            callbackReceivedAt: new Date()
          }
        }
      });

      return {
        success: true,
        message: 'Callback processed successfully',
        data: updatedPayment
      };
    } catch (error) {
      console.error('Error handling payment callback:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to process payment callback');
    }
  }

  async getPaymentStatus(id: number) {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id },
        select: {
          id: true,
          transactionId: true,
          status: true,
          amount: true,
          paymentMethod: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      return payment;
    } catch (error) {
      console.error('Error fetching payment status:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch payment status');
    }
  }
}
