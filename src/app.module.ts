import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeesModule } from './fees/fees.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FeesModule, ShopsModule],
})
export class AppModule {}
