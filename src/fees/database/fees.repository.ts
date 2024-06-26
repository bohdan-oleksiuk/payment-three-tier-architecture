import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { FeesRepositoryPort } from './fees.repository.port';
import { UpdateFeesDto } from '../dto/update-fees.dto';
import { FeeEntity } from '../entities/fee.entity';
import { FeesEntity } from '../../../dist/fees/entities/fees.entity';

@Injectable()
export class FeesRepository implements FeesRepositoryPort {
  private readonly fees_repo: FeesEntity;

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
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  async get() {
    try {
      return this.fees_repo;
    } catch (e) {
      this.logger.error(`Error while get fee: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
