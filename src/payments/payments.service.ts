import { Inject, Injectable } from '@nestjs/common';
import { PaymentsRepositoryPort } from './database/payments.repository.port';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentResponseType } from './types/create-payment-response.type';
import { ShopsRepositoryPort } from '../shops/database/shops.repository.port';
import { CompletePaymentsDto } from './dto/complete-payments.dto';
import { ChangePaymentResponseType } from './types/change-payment-response.type';
import { ProcessPaymentsDto } from './dto/process-payments.dto';
import { MakePayoutDto } from './dto/make-payout.dto';
import { MakePayoutResponseType } from './types/make-payout-response.type';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PaymentsRepositoryPort) private repository: PaymentsRepositoryPort,
    @Inject(ShopsRepositoryPort) private shopsRepository: ShopsRepositoryPort,
  ) {}

  async create(dto: CreatePaymentDto): Promise<CreatePaymentResponseType> {
    return this.repository.create(dto);
  }

  async processPayments(
    dto: ProcessPaymentsDto,
  ): Promise<ChangePaymentResponseType> {
    return this.repository.processPayments(dto);
  }

  async completePayments(
    dto: CompletePaymentsDto,
  ): Promise<ChangePaymentResponseType> {
    return this.repository.completePayments(dto);
  }

  async makePayout(dto: MakePayoutDto): Promise<MakePayoutResponseType> {
    return this.repository.makePayout(dto);
  }
}
