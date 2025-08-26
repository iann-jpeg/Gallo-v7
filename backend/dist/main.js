"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prismaService = app.get(prisma_service_1.PrismaService);
    process.on('SIGTERM', async () => {
        logger.log('SIGTERM received, shutting down gracefully...');
        await prismaService.$disconnect();
        process.exit(0);
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https:"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "https://galloways.co.ke", ...(process.env.NODE_ENV === 'development' ? ["http://localhost:*", "http://127.0.0.1:*"] : [])],
                formAction: ["'self'"],
                scriptSrc: ["'self'"],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));
    const allowedOrigins = [
        'https://galloways.co.ke',
        'https://www.galloways.co.ke',
        'https://app.galloways.co.ke',
        'https://api.galloways.co.ke'
    ];
    if (process.env.NODE_ENV === 'development') {
        allowedOrigins.push('http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173');
    }
    if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
        allowedOrigins.push(process.env.FRONTEND_URL);
    }
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
        exposedHeaders: 'Authorization',
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    app.use((req, res, next) => {
        res.header('Cross-Origin-Resource-Policy', 'cross-origin');
        const cspConnectSrc = process.env.NODE_ENV === 'development'
            ? "connect-src 'self' https://galloways.co.ke http://localhost:* http://127.0.0.1:*"
            : "connect-src 'self' https://galloways.co.ke";
        res.header('Content-Security-Policy', `default-src 'self'; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; ${cspConnectSrc}; form-action 'self'; script-src 'self'; base-uri 'self'; font-src 'self' https: data:; frame-ancestors 'self'; object-src 'none'; script-src-attr 'none'; upgrade-insecure-requests`);
        next();
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Exact API')
        .setDescription('API documentation for Exact backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT || 3001;
    logger.log(`🚀 Server starting on port ${port}`);
    try {
        const server = await app.listen(port);
        const { setupAdminPanelSocket } = require('./internal-admin-panel.controller');
        setupAdminPanelSocket(server);
        const baseUrl = process.env.NODE_ENV === 'production' ? 'https://galloways.co.ke' : `http://localhost:${port}`;
        logger.log(`✅ Server running at ${baseUrl}`);
        logger.log(`📚 API Documentation: ${baseUrl}/docs`);
    }
    catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map