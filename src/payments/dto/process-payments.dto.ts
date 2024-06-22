import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { Transformation } from '../../helpers';

export class ProcessPaymentsDto {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value }) =>
    value ? Transformation.mapString(value) : undefined,
  )
  ids: string[];
}
