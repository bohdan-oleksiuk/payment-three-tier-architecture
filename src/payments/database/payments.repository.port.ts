import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreatePaymentResponseType } from '../types/create-payment-response.type';

export abstract class PaymentsRepositoryPort {
  abstract create(dto: CreatePaymentDto): Promise<CreatePaymentResponseType>;
}
