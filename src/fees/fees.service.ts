import { Inject, Injectable } from '@nestjs/common';
import { FeesRepositoryPort } from './database/fees.repository.port';
import { UpdateFeesDto } from './dto/update-fees.dto';
import { FeesEntity } from './entities/fees.entity';

@Injectable()
export class FeesService {
  constructor(
    @Inject(FeesRepositoryPort) private repository: FeesRepositoryPort,
  ) {}

  async get(): Promise<FeesEntity> {
    return this.repository.get();
  }

  async update(dto: UpdateFeesDto): Promise<FeesEntity> {
    return this.repository.update(dto);
  }
}
