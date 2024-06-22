import { Injectable, Logger } from '@nestjs/common';
import { FeesRepositoryPort } from './fees.repository.port';
import { UpdateFeesDto } from '../dto/update-fees.dto';
import { FeeEntity } from '../entities/fee.entity';

@Injectable()
export class FeesRepository implements FeesRepositoryPort {
  private readonly fees_repo;

  private readonly logger = new Logger(FeesRepository.name);

  constructor() {
    const fee = new FeeEntity();
    fee.fixed_commission = 0;
    fee.commission_percentage = 0;
    fee.temporary_blocking = 0;
    this.fees_repo = fee;
  }

  async update(dto: UpdateFeesDto) {
    try {
      this.fees_repo.fixed_commission = dto.fixed_commission;
      this.fees_repo.commission_percentage = dto.commission_percentage;
      this.fees_repo.temporary_blocking = dto.temporary_blocking;
      return this.fees_repo;
    } catch (e) {
      this.logger.error(`Error while update fee: ${e}`);
      return null;
    }
  }

  async get() {
    try {
      return this.fees_repo;
    } catch (e) {
      this.logger.error(`Error while get fee: ${e}`);
      return null;
    }
  }
}
