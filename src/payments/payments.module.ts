import { Module, Provider } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepositoryPort } from './database/payments.repository.port';
import { PaymentsRepository } from './database/payments.repository';
import { FeesModule } from '../fees/fees.module';
import { ShopsModule } from '../shops/shops.module';

const repositories: Provider[] = [
  PaymentsRepository,
  { provide: PaymentsRepositoryPort, useExisting: PaymentsRepository },
];
@Module({
  imports: [FeesModule, ShopsModule],
  providers: [...repositories, PaymentsService],
  controllers: [PaymentsController],
  exports: [...repositories],
})
export class PaymentsModule {}
