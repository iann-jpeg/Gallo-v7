import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './middleware/jwt-auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './routes/auth.module';
import { UsersModule } from './routes/users.module';
import { ProductsModule } from './routes/products.module';
import { ClaimsModule } from './routes/claims.module';
import { QuotesModule } from './routes/quotes.module';
import { ConsultationsModule } from './routes/consultations.module';
import { DiasporaModule } from './routes/diaspora.module';
import { HealthModule } from './routes/health.module';
import { DashboardModule } from './routes/dashboard.module';
import { DocumentsModule } from './routes/documents.module';
import { OutsourcingModule } from './routes/outsourcing.module';
import { PaymentModule } from './routes/payment.module';
import { ResourceModule } from './routes/resource.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    ClaimsModule,
    QuotesModule,
    ConsultationsModule,
    DiasporaModule,
    HealthModule,
    DashboardModule,
    DocumentsModule,
    OutsourcingModule,
    PaymentModule,
    ResourceModule,
    AdminModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
//import { PrismaClient, Role } from '@prisma/client';
//import * as bcrypt from 'bcrypt';

//const prisma = new PrismaClient();

//async function ensureDefaultAdmin() {
//  const userCount = await prisma.user.count();
//  if (userCount === 0) {
//    const hashed = await bcrypt.hash('admin123', 10);
//    await prisma.user.create({
//      data: {
//        name: 'Default Admin',
//        email: 'admin@admin.com',
//        password: hashed,
//        role: Role.ADMIN
//      }
//    });
//    console.log('✅ Default admin user created');
//  }
//}

//ensureDefaultAdmin().catch(console.error);
