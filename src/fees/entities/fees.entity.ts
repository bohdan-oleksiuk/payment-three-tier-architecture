import { ApiProperty } from '@nestjs/swagger';

export class FeesEntity {
  @ApiProperty()
  fixed_commission: number;

  @ApiProperty()
  commission_percentage: number;

  @ApiProperty()
  temporary_blocking: number;
}
