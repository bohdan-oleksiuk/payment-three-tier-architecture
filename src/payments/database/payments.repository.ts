import { PaymentsRepositoryPort } from './payments.repository.port';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PaymentEntity } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { randomUUID } from 'crypto';
import { PaymentStatusType } from '../types/payment-status.enum';
import { CreatePaymentResponseType } from '../types/create-payment-response.type';
import { ShopsRepositoryPort } from '../../shops/database/shops.repository.port';
import { ProcessPaymentsDto } from '../dto/process-payments.dto';
import { CompletePaymentsDto } from '../dto/complete-payments.dto';
import { ChangePaymentResponseType } from '../types/change-payment-response.type';

@Injectable()
export class PaymentsRepository implements PaymentsRepositoryPort {
  private payments_repo = {};
  private readonly logger = new Logger(PaymentsRepository.name);

  constructor(
    @Inject(ShopsRepositoryPort) private shopsRepository: ShopsRepositoryPort,
  ) {}

  async create(dto: CreatePaymentDto): Promise<CreatePaymentResponseType> {
    try {
      const payment = new PaymentEntity();
      payment.id = randomUUID();
      payment.shopId = dto.shopId;
      payment.amount = dto.amount;
      payment.status = PaymentStatusType.received;
      this.payments_repo[payment.id] = payment;

      return { id: payment.id };
    } catch (e) {
      this.logger.error(`Error while create payment: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  async processPayments(
    dto: ProcessPaymentsDto,
  ): Promise<ChangePaymentResponseType> {
    try {
      const { ids } = dto;
      ids.forEach((id) => {
        if (this.payments_repo[id]) {
          this.payments_repo[id].status = PaymentStatusType.processed;
        }
      });
      return { status: 'success' };
    } catch (e) {
      this.logger.error(`Error while process payments: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  async completePayments(
    dto: CompletePaymentsDto,
  ): Promise<ChangePaymentResponseType> {
    try {
      const { ids } = dto;
      ids.forEach((id) => {
        if (this.payments_repo[id]) {
          this.payments_repo[id].status = PaymentStatusType.completed;
        }
      });
      return { status: 'success' };
    } catch (e) {
      this.logger.error(`Error while complete payments: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
