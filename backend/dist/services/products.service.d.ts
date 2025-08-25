export declare class ProductsService {
    findAll({ search, page, limit }: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import(".prisma/client").Prisma.Prisma__ProductClient<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import(".prisma/client").Prisma.Prisma__ProductClient<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
