# Production-ready Dockerfile for NestJS + Prisma
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn install --frozen-lockfile || npm install --legacy-peer-deps
COPY . .
RUN yarn build || npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
