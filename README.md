# 🛡️ Galloways Insurance Platform

A comprehensive insurance management platform built with modern web technologies, optimized for Aplin hosting with PostgreSQL database integration.

## 🏗️ Architecture & Technology Stack

### Frontend (React + TypeScript)
- **Framework**: React 18 + TypeScript + Vite 5
- **Styling**: TailwindCSS + Shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Real-time**: Socket.io Client for live updates
- **Deployment**: Static hosting on Aplin (galloways.co.ke)

### Backend (NestJS + PostgreSQL)
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL with Prisma ORM (gallowa2_gallowaysdb)
- **Authentication**: JWT-based secure auth system
- **Payments**: M-PESA + Paystack integration
- **Email**: ElasticEmail SMTP service
- **Real-time**: Socket.io for admin dashboard
- **Deployment**: Node.js hosting on Aplin (galloways.co.ke/api)

## 🚀 Features

### Core Services
- **Claims Management** - Complete claims processing and tracking
- **Insurance Quotes** - Dynamic quote generation for various insurance products
- **Consultancy Services** - Professional insurance consultation booking
- **Diaspora Services** - Specialized services for Kenyans abroad
- **Outsourcing Solutions** - Business process outsourcing services

### Payment Integration
- **Paystack Integration** - Complete USD payment processing for diaspora clients
- **M-PESA STK Push** - Real-time mobile money integration for local payments
- **Secure Webhooks** - Automated payment confirmation and processing
- **Multi-Currency Support** - USD for international, KES for local payments

### Admin Dashboard
- **Real-time Analytics** - Comprehensive business metrics and KPIs
- **User Management** - Complete user administration and role management
- **Payment Tracking** - Transaction monitoring and reconciliation
- **Service Management** - Claims, quotes, and consultation management
- **Notification System** - Real-time updates and alerts

## 🛠 Technology Stack

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth with role-based access control
- **API**: RESTful APIs with comprehensive validation
- **Security**: CORS, CSP headers, webhook signature verification

### Frontend (React)
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components with Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Query for server state
- **Build Tool**: Vite for fast development and building

### Infrastructure
- **Database**: Neon PostgreSQL (serverless)
- **Hosting**: Aplin hosting with custom domain
- **Domain**: galloways.co.ke (frontend), api.galloways.co.ke (backend)
- **CDN**: Static asset optimization

## 📁 Project Structure

```
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── controllers/     # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── modules/         # Feature modules
│   │   ├── middleware/      # Authentication & security
│   │   ├── config/          # DTOs and validation
│   │   └── prisma/          # Database schema and migrations
│   ├── uploads/             # File storage
│   └── dist/                # Compiled JavaScript
│
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── lib/             # Utilities and API client
│   │   ├── hooks/           # Custom React hooks
│   │   └── integrations/    # External service integrations
│   └── public/              # Static assets
│
├── PAYSTACK_INTEGRATION_GUIDE.md  # Payment integration documentation
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iann-jpeg/Gallo-End.git
   cd Gallo-End/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database URL, JWT secret, and payment provider credentials.

4. **Database Setup**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server**:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd ../frontend/gallo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   Update with your backend API URL.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/galloways"

# JWT Authentication
JWT_SECRET="your-super-secure-jwt-secret"
JWT_EXPIRES_IN="7d"

# Paystack Configuration
PAYSTACK_SECRET_KEY="sk_live_your_secret_key"
PAYSTACK_PUBLIC_KEY="pk_live_your_public_key"
PAYSTACK_WEBHOOK_SECRET="your_webhook_secret"
PAYSTACK_CALLBACK_URL="https://galloways.co.ke/payment-callback"

# M-PESA Configuration
MPESA_CONSUMER_KEY="your_mpesa_consumer_key"
MPESA_CONSUMER_SECRET="your_mpesa_consumer_secret"
MPESA_SHORTCODE="your_shortcode"
MPESA_PASSKEY="your_passkey"
MPESA_CALLBACK_URL="https://api.galloways.co.ke/api/payments/callback/mpesa"
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://api.galloways.co.ke/api
VITE_WHATSAPP_NUMBER=+254712345678
VITE_COMPANY_EMAIL=info@galloways.co.ke
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

### Payment Endpoints
- `POST /payments/initiate` - Initialize payment
- `POST /payments/callback/paystack` - Paystack webhook
- `POST /payments/callback/mpesa` - M-PESA webhook
- `GET /payments/verify/{reference}` - Verify payment status

### Admin Endpoints
- `GET /admin/dashboard` - Dashboard analytics
- `GET /admin/users` - User management
- `GET /admin/payments` - Payment records
- `GET /admin/claims` - Claims management

## 🔐 Security Features

- **JWT Authentication** with role-based access control
- **CORS Configuration** for cross-origin requests
- **Webhook Signature Verification** for payment security
- **Input Validation** with class-validator
- **SQL Injection Protection** via Prisma ORM
- **Rate Limiting** on sensitive endpoints

## 💳 Payment Integration

### Paystack (International Payments)
- Complete integration for USD transactions
- Webhook handling for payment confirmation
- Automatic payment verification
- Support for cards and bank transfers

### M-PESA (Local Payments)
- Real-time STK Push implementation
- OAuth token management
- Callback handling and verification
- Support for business-to-customer transactions

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend
```bash
cd frontend/gallo
npm run build
# Deploy dist/ folder to your hosting provider
```

### Docker Support
```bash
# Backend
cd backend
docker build -t galloways-backend .
docker run -p 3000:3000 galloways-backend

# Frontend (if needed)
cd frontend/gallo
docker build -t galloways-frontend .
docker run -p 5173:5173 galloways-frontend
```

## 📈 Monitoring & Analytics

- **Real-time Dashboard** with key business metrics
- **Payment Transaction Tracking** with detailed logs
- **User Activity Monitoring** for admin insights
- **Error Logging** with comprehensive stack traces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software owned by Galloways Insurance Agencies & Consultancy Services.

## 📞 Support

- **Website**: https://galloways.co.ke
- **Email**: info@galloways.co.ke
- **WhatsApp**: +254712345678
- **Phone**: +254700123456

## 🎯 Roadmap

- [ ] Mobile application (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Insurance product calculator
- [ ] Document management system
- [ ] Customer portal enhancements

---

**Built with ❤️ by the Galloways Development Team**
