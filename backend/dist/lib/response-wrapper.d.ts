import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class globalResponseWrapper implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
