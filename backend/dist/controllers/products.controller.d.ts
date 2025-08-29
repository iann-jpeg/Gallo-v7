import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../config/product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(search?: string, page?: number, limit?: number): Promise<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    } | null>;
    create(data: CreateProductDto): Promise<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }>;
    update(id: string, data: UpdateProductDto): Promise<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        features: string[];
        category: string;
    }>;
}
