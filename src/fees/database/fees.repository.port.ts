import { UpdateFeesDto } from '../dto/update-fees.dto';
import { FeeEntity } from '../entities/fee.entity';

export abstract class FeesRepositoryPort {
  abstract update(dto: UpdateFeesDto): Promise<FeeEntity>;
  abstract get(): Promise<FeeEntity>;
}
