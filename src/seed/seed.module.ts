import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { PaymentsModule } from '../payments/payments.module';
import { FeesModule } from '../fees/fees.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports: [PaymentsModule, FeesModule, ShopsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
