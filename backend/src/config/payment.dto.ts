import { IsString, IsEmail, IsNumber, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  policyNumber?: string;

  @IsNotEmpty()
  @IsString()
  clientName!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['mpesa', 'card', 'paystack'])
  paymentMethod!: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  expiryDate?: string;

  @IsOptional()
  @IsString()
  cvv?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  billingPhone?: string;

  @IsOptional()
  metadata?: any;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'processing', 'completed', 'failed'])
  status?: string;

  @IsOptional()
  metadata?: any;
}

export class PaymentCallbackDto {
  @IsNotEmpty()
  @IsString()
  transactionId!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['success', 'failed', 'cancelled'])
  status!: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  metadata?: any;
}
