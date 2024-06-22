import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly fixed_commission: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly commission_percentage: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly temporary_blocking: number;
}
