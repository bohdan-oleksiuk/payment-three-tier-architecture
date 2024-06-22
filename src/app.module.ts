import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeesModule } from './fees/fees.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FeesModule],
})
export class AppModule {}
