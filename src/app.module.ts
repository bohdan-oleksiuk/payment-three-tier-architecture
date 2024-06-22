import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeesModule } from './fees/fees.module';
import { ShopsModule } from './shops/shops.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FeesModule,
    ShopsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
