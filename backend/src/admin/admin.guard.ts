import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Allow requests from allowed origins based on environment
    const allowedOrigins = process.env.NODE_ENV === 'development' 
      ? ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173']
      : ['https://galloways.co.ke', 'https://www.galloways.co.ke', 'https://app.galloways.co.ke'];
    const origin = request.headers.origin;
    
    return allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development';
  }
}
