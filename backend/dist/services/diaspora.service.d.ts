export declare class DiasporaService {
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        phone: string;
        country: string;
        timezone: string;
        scheduledAt: Date | null;
        serviceInterest: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        phone: string;
        country: string;
        timezone: string;
        scheduledAt: Date | null;
        serviceInterest: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        phone: string;
        country: string;
        timezone: string;
        scheduledAt: Date | null;
        serviceInterest: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        phone: string;
        country: string;
        timezone: string;
        scheduledAt: Date | null;
        serviceInterest: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__DiasporaRequestClient<{
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        phone: string;
        country: string;
        timezone: string;
        scheduledAt: Date | null;
        serviceInterest: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
