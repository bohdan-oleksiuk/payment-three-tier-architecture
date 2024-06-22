import { Module, Provider } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';
import { FeesRepository } from './database/fees.repository';
import { FeesRepositoryPort } from './database/fees.repository.port';

const repositories: Provider[] = [
  FeesRepository,
  { provide: FeesRepositoryPort, useExisting: FeesRepository },
];

@Module({
  controllers: [FeesController],
  providers: [...repositories, FeesService],
  exports: [...repositories],
})
export class FeesModule {}
