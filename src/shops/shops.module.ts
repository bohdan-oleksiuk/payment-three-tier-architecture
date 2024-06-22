import { Module, Provider } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { ShopsRepositoryPort } from './database/shops.repository.port';
import { ShopsRepository } from './database/shops.repository';

const repositories: Provider[] = [
  ShopsRepository,
  { provide: ShopsRepositoryPort, useExisting: ShopsRepository },
];

@Module({
  controllers: [ShopsController],
  providers: [...repositories, ShopsService],
  exports: [...repositories],
})
export class ShopsModule {}
