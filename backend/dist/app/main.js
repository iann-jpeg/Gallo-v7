"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const common_1 = require("@nestjs/common");
const response_wrapper_1 = require("../lib/response-wrapper");
const helmet_1 = require("helmet");
const bodyParser = require("body-parser");
function handleOptions(req, res, next) {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.sendStatus(200);
    }
    next();
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.json());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new response_wrapper_1.globalResponseWrapper());
    app.enableCors({
        origin: '*',
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    });
    app.use((0, helmet_1.default)());
    app.use(handleOptions);
    const server = await app.listen(process.env.PORT || 3001);
    const { setupAdminPanelSocket } = require('../internal-admin-panel.controller');
    const socketService = setupAdminPanelSocket(server);
    console.log('✅ Server is running on http://localhost:3001');
    console.log('📚 API Documentation available at http://localhost:3001/docs');
    console.log('🔌 Socket.io for real-time admin updates is active');
}
bootstrap();
//# sourceMappingURL=main.js.map