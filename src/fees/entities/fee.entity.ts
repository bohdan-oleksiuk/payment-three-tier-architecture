import { ApiProperty } from '@nestjs/swagger';

export class FeeEntity {
  @ApiProperty()
  fixed_commission: number;

  @ApiProperty()
  commission_percentage: number;

  @ApiProperty()
  temporary_blocking: number;
}
