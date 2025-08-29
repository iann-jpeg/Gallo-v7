export declare function paginate(page?: number, limit?: number): {
    take: number;
    skip: number;
};
export declare function handlePrismaError(error: any): {
    success: boolean;
    message: any;
};
export declare function log(...args: any[]): void;
