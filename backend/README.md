# Exact Backend

Production-ready NestJS backend for insurance platform.

## Features

## Setup
1. Copy `.env.example` to `.env` and fill in secrets
2. Run `docker-compose up --build`
3. Run `yarn install` or `npm install`
4. Run `npx prisma migrate dev`
5. Run `yarn start:dev` or `npm run start:dev`

## Docs

## TODO
This backend is now deprecated. The frontend connects directly to Supabase for all data and storage operations.

All references to Railway, Neon, Prisma, and admin scripts have been removed.

# Galloways Admin Backend

## Environment Variables
See `.env.example` for all required variables:
- PORT
- NODE_ENV
- DATABASE_URL
- JWT_SECRET
- CORS_ORIGINS
- ELASTIC_EMAIL_API_KEY
- ELASTIC_EMAIL_FROM

## Migrations
1. Update your `.env` with correct `DATABASE_URL`.
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Start Server
```bash
npm run start
```

## Rollout Checklist
- [x] All endpoints match frontend contract (`api/contract.md`)
- [x] Admin login, logout, and protected routes work
- [x] All modules (claims, dashboard, payments, etc.) are wired
- [x] DB queries are paginated, error-safe, and fast
- [x] Elastic Email notifications work
- [x] CORS, security headers, rate limits, gzip enabled
- [x] No unnecessary server restarts
- [x] API responses match frontend shape
- [x] Zero-downtime migrations

## Deployment
- Use a process manager (PM2, Docker, etc.) for production
- Monitor health at `/api/health`
- API docs at `/api/docs` (if enabled)

---
For any issues, check logs and ensure database connectivity. All admin features are now production-ready and match the frontend 1:1.
