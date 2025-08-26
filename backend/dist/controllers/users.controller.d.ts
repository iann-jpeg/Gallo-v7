import { UsersService } from '../services/users.service';
import { RegisterDto } from '../config/auth.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        success: boolean;
        data: {
            name: string;
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        }[];
        message: string;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: RegisterDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: Partial<RegisterDto>): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
