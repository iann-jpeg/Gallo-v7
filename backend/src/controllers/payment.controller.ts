import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto, PaymentCallbackDto } from '../config/payment.dto';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard';
import { RolesGuard } from '../middleware/roles.guard';
import { Roles } from '../middleware/roles.decorator';
import { Public } from '../middleware/public.decorator';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
  ) {
    return this.paymentService.findAll(+page, +limit, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.paymentService.findOne(+id, req.user);
  }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Post('initiate')
  @Public()
  async initiatePayment(@Body() createPaymentDto: CreatePaymentDto) {
    // This endpoint is specifically for frontend payment initiation
    return this.paymentService.create(createPaymentDto);
  }

  @Post('process/:id')
  async processPayment(@Param('id') id: string) {
    return this.paymentService.processPayment(+id);
  }

  // M-PESA Webhook (Callback)
  @Post('callback/mpesa')
  @Public()
  async mpesaCallback(@Body() callbackData: PaymentCallbackDto) {
    // Safaricom sends callback data in a specific format
    // You may need to parse and map it to your DTO
    return this.paymentService.handleMpesaCallback(callbackData);
  }

  @Post('callback/paypal')
  @Public()
  async paypalCallback(@Body() callbackData: PaymentCallbackDto) {
    return this.paymentService.handlePaypalCallback(callbackData);
  }

  @Post('callback/card')
  @Public()
  async cardCallback(@Body() callbackData: PaymentCallbackDto) {
    return this.paymentService.handleCardCallback(callbackData);
  }
  // Paystack Webhook (Callback)
  @Post('callback/paystack')
  @Public()
  async paystackCallback(@Body() callbackData: any, @Req() req: any) {
    // Get webhook signature from headers for verification
    const signature = req.headers['x-paystack-signature'];
    return this.paymentService.handlePaystackCallback(callbackData, signature);
  }

  // Verify Paystack payment status
  @Get('verify/:reference')
  @Public()
  async verifyPayment(@Param('reference') reference: string) {
    return this.paymentService.verifyPaystackPayment(reference);
  }
}
