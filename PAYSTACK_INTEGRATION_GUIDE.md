# Paystack Integration Guide

## Overview
This document outlines the complete Paystack payment integration for the Galloways Insurance platform, specifically for diaspora consultation payments.

## Backend Implementation

### 1. Environment Variables Required
Add the following to your `.env` file:

```env
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_actual_public_key_here
PAYSTACK_API_URL=https://api.paystack.co
PAYSTACK_CALLBACK_URL=https://galloways.co.ke/payment-callback
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret_from_paystack_dashboard
```

**Important**: Replace with actual keys from your Paystack Dashboard.

### 2. API Endpoints

#### Payment Initiation
- **Endpoint**: `POST /api/payments/initiate`
- **Public**: Yes (no authentication required)
- **Body**:
```json
{
  "clientName": "John Doe",
  "email": "john@example.com",
  "amount": 25,
  "paymentMethod": "paystack",
  "metadata": {
    "consultationTime": "2024-12-25T10:00:00Z",
    "service": "diaspora-consultation"
  }
}
```

#### Webhook Endpoint
- **Endpoint**: `POST /api/payments/callback/paystack`
- **Public**: Yes (for Paystack webhooks)
- **Headers**: `x-paystack-signature` (for verification)

#### Payment Verification
- **Endpoint**: `GET /api/payments/verify/{reference}`
- **Public**: Yes
- **Returns**: Payment verification status

### 3. Payment Flow

1. **Frontend initiates payment**: User fills form and submits
2. **Backend creates payment record**: Generates transaction ID and calls Paystack
3. **Paystack initialization**: Returns authorization URL
4. **User redirects to Paystack**: Completes payment on Paystack's secure page
5. **Paystack redirects back**: User returns to `/payment-callback` page
6. **Verification**: Frontend calls verification endpoint
7. **Webhook processing**: Paystack sends webhook to update payment status

## Frontend Implementation

### 1. Environment Variables
Add to your frontend `.env` file:

```env
VITE_API_BASE_URL=https://api.galloways.co.ke/api
VITE_WHATSAPP_NUMBER=+254712345678
```

### 2. Payment Form Integration
The Diaspora.tsx page includes a complete payment form that:
- Collects user details (name, email, consultation time)
- Validates form data
- Calls the backend payment initiation endpoint
- Redirects to Paystack payment page

### 3. Payment Callback Handling
The PaymentCallback.tsx page:
- Receives payment reference from URL parameters
- Calls verification endpoint to confirm payment status
- Shows success/failure UI with appropriate actions
- Provides WhatsApp integration for next steps

## Security Features

### 1. Webhook Signature Verification
- Paystack signs webhooks with your secret key
- Backend verifies signature before processing
- Prevents fraudulent webhook calls

### 2. Payment Verification
- Double-checks payment status with Paystack API
- Ensures payment authenticity before marking as complete

### 3. Environment Security
- All sensitive keys stored in environment variables
- Different keys for test/live environments

## Setup Instructions

### 1. Paystack Dashboard Setup
1. Create a Paystack account at https://paystack.com
2. Get your API keys from Settings > API Keys & Webhooks
3. Set up webhook endpoint: `https://api.galloways.co.ke/api/payments/callback/paystack`
4. Enable these webhook events:
   - `charge.success`
   - `charge.failed`

### 2. Environment Configuration
1. Update backend `.env` with actual Paystack credentials
2. Update frontend `.env` with correct API URL
3. Ensure callback URL matches your domain

### 3. Testing
1. Use test keys for development
2. Use live keys for production
3. Test webhook delivery using ngrok for local development

## Currency Support
- **Primary**: USD (for diaspora clients)
- Paystack automatically handles currency conversion
- Amount is sent in smallest currency unit (kobo for NGN, cents for USD)

## Payment States
- **pending**: Initial state when payment is created
- **processing**: Payment initiated with Paystack
- **completed**: Payment successful
- **failed**: Payment failed

## Error Handling
- Network errors are caught and displayed to users
- Invalid payments are rejected at API level
- Failed payments show retry options
- Webhook failures are logged for debugging

## Monitoring & Logs
- All payment attempts are logged
- Webhook events are logged with full payload
- Failed payments include error details
- Transaction IDs are unique and traceable

## Support & Troubleshooting
- WhatsApp integration for immediate support
- Payment reference numbers for tracking
- Detailed error messages for failed payments
- Admin panel for payment management

## Next Steps for Production
1. Obtain live Paystack API keys
2. Test with small amounts first
3. Monitor webhook delivery
4. Set up payment reconciliation process
5. Configure email notifications for successful payments

## Important Notes
- Paystack charges a transaction fee (check their pricing)
- Webhooks may be delayed - always verify payment status
- Keep your secret keys secure and never expose them in frontend code
- Regular backup of payment data is recommended
