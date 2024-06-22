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
    const shopFee = shop.service_fee;
    const fees = await this.feeRepository.get();
    const fee =
      fees.fixed_commission +
      (dto.amount * fees.commission_percentage) / 100 +
      (dto.amount * shopFee) / 100;
    const availableAmount = dto.amount - fee;
    const tmpBlocking = (dto.amount * fees.temporary_blocking) / 100;
    try {
      const payment = new PaymentEntity();
      payment.id = randomUUID();
      payment.shopId = dto.shopId;
      payment.amount = dto.amount;
      payment.availableAmount = availableAmount;
      payment.tmpBlock = tmpBlocking;
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
          const tmpSum = this.payments_repo[id].tmpBlock;
          this.payments_repo[id].status = PaymentStatusType.completed;
          this.payments_repo[id].tmpBlock = 0;
          this.payments_repo[id].availableAmount += tmpSum;
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
    let totalPayout = 0;
    const payouts = [];

    try {
      const array = (Object.values(this.payments_repo) as PaymentEntity[]).sort(
        sortFun,
      );

      for (const payment of array) {
        if (
          payment.status === PaymentStatusType.completed ||
          payment.status === PaymentStatusType.processed
        ) {
          if (payment.status === PaymentStatusType.completed) {
            this.payments_repo[payment.id].status = PaymentStatusType.success;
          }
          const sum = this.payments_repo[payment.id].availableAmount;
          if (sum > 0) {
            this.payments_repo[payment.id].availableAmount = 0;
            await this.shopsRepository.updateShopBalance(dto.shopId, sum);
            totalPayout += sum;
            payouts.push({ payment_id: payment.id, amount: sum });
          }
        }
      }

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

function sortFun(a: PaymentEntity, b: PaymentEntity): number {
  if (
    a.status === PaymentStatusType.completed &&
    b.status === PaymentStatusType.completed
  ) {
    return 0;
  }
  if (a.status === PaymentStatusType.completed) {
    return -1;
  }
  if (b.status === PaymentStatusType.completed) {
    return 1;
  }
  return 0;
}
