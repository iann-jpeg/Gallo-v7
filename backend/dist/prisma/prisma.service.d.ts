import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private maxRetries;
    private retryDelay;
    constructor();
    private maskDatabaseUrl;
    connectWithRetry(attempt?: number): Promise<void>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    enableShutdownHooks(app: any): Promise<void>;
}
