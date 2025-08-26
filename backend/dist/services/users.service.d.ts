export declare class UsersService {
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
