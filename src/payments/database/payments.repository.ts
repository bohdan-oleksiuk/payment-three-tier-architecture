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
import { MakePayoutDto } from '../dto/make-payout.dto';
import { FeesRepositoryPort } from '../../fees/database/fees.repository.port';
import { MakePayoutResponseType } from '../types/make-payout-response.type';

@Injectable()
export class PaymentsRepository implements PaymentsRepositoryPort {
  private payments_repo = {};
  private readonly logger = new Logger(PaymentsRepository.name);

  constructor(
    @Inject(ShopsRepositoryPort) private shopsRepository: ShopsRepositoryPort,
    @Inject(FeesRepositoryPort) private feeRepository: FeesRepositoryPort,
  ) {}

  async create(dto: CreatePaymentDto): Promise<CreatePaymentResponseType> {
    const shop = await this.shopsRepository.getOne(dto.shopId);
    if (!shop) throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
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

  async makePayout(dto: MakePayoutDto): Promise<MakePayoutResponseType> {
    const shop = await this.shopsRepository.getOne(dto.shopId);
    if (!shop) throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    let shopBalance = shop.balance;
    const shopFee = shop.service_fee;
    const fees = await this.feeRepository.get();
    let totalPayout = 0;
    const payouts = [];

    try {
      Object.keys(this.payments_repo).forEach((paymentId) => {
        const payment: PaymentEntity = this.payments_repo[paymentId];
        if (
          payment.shopId === dto.shopId &&
          (payment.status === 'processed' || payment.status === 'completed')
        ) {
          const amount = payment.amount;
          const fee =
            fees.fixed_commission +
            (amount * fees.commission_percentage) / 100 +
            (amount * shopFee) / 100;
          let availableAmount = amount - fee;

          if (payment.status === 'processed') {
            availableAmount -= (amount * fees.temporary_blocking) / 100;
          }

          if (shopBalance >= availableAmount) {
            shopBalance -= availableAmount;
            payouts.push({ id: paymentId, amount: availableAmount });
            totalPayout += availableAmount;
          }
          //TODO: add else logic
        }
      });

      await this.shopsRepository.updateShopBalance(dto.shopId, shopBalance);

      return {
        total_payout: totalPayout,
        payouts,
      };
    } catch (e) {
      this.logger.error(`Error while make payout: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
