import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreatePaymentResponseType } from '../types/create-payment-response.type';
import { CompletePaymentsDto } from '../dto/complete-payments.dto';
import { ChangePaymentResponseType } from '../types/change-payment-response.type';
import { ProcessPaymentsDto } from '../dto/process-payments.dto';

export abstract class PaymentsRepositoryPort {
  abstract create(dto: CreatePaymentDto): Promise<CreatePaymentResponseType>;
  abstract completePayments(
    dto: CompletePaymentsDto,
  ): Promise<ChangePaymentResponseType>;
  abstract processPayments(
    dto: ProcessPaymentsDto,
  ): Promise<ChangePaymentResponseType>;
}
