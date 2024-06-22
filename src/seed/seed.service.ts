import { Inject, Injectable } from '@nestjs/common';
import { PaymentsRepositoryPort } from '../payments/database/payments.repository.port';
import { ShopsRepositoryPort } from '../shops/database/shops.repository.port';
import { FeesRepositoryPort } from '../fees/database/fees.repository.port';

@Injectable()
export class SeedService {
  constructor(
    @Inject(PaymentsRepositoryPort)
    private paymentsRepository: PaymentsRepositoryPort,
    @Inject(ShopsRepositoryPort) private shopsRepository: ShopsRepositoryPort,
    @Inject(FeesRepositoryPort) private feesRepository: FeesRepositoryPort,
  ) {}

  async seed() {
    const fees = await this.feesRepository.update({
      fixed_commission: 0.3,
      commission_percentage: 0.3,
      temporary_blocking: 0.3,
    });

    const shop = await this.shopsRepository.create({
      name: 'test',
      service_fee: 0.3,
    });

    const payment1 = await this.paymentsRepository.create({
      shopId: shop.id,
      amount: 1010,
    });

    const payment2 = await this.paymentsRepository.create({
      shopId: shop.id,
      amount: 51,
    });

    const payment3 = await this.paymentsRepository.create({
      shopId: shop.id,
      amount: 102,
    });

    const payment4 = await this.paymentsRepository.create({
      shopId: shop.id,
      amount: 500,
    });

    await this.paymentsRepository.completePayments({
      ids: [payment2.id, payment3.id],
    });

    await this.paymentsRepository.processPayments({
      ids: [payment1.id, payment4.id],
    });

    return {
      shop,
      fees,
      payments: {
        payment1,
        payment2,
        payment3,
        payment4,
      },
    };
  }
}
