export declare class DiasporaService {
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        name: string;
        id: number;
        userId: number | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        id: number;
        userId: number | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        id: number;
        userId: number | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        id: number;
        userId: number | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        id: number;
        userId: number | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
