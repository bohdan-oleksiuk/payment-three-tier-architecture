import { UpdateFeesDto } from '../dto/update-fees.dto';
import { FeesEntity } from '../entities/fees.entity';

export abstract class FeesRepositoryPort {
  abstract update(dto: UpdateFeesDto): Promise<FeesEntity>;
  abstract get(): Promise<FeesEntity>;
}
