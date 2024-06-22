import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MakePayoutDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shopId: string;
}
