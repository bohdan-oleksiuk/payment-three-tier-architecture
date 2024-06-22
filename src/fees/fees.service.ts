import { Inject, Injectable } from '@nestjs/common';
import { FeesRepositoryPort } from './database/fees.repository.port';
import { UpdateFeesDto } from './dto/update-fees.dto';
import { FeeEntity } from './entities/fee.entity';

@Injectable()
export class FeesService {
  constructor(
    @Inject(FeesRepositoryPort) private repository: FeesRepositoryPort,
  ) {}

  async get(): Promise<FeeEntity> {
    return this.repository.get();
  }

  async update(dto: UpdateFeesDto): Promise<FeeEntity> {
    return this.repository.update(dto);
  }
}
