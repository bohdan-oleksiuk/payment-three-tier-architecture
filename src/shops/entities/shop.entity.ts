import { ApiProperty } from '@nestjs/swagger';

export class ShopEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  service_fee: number;

  @ApiProperty()
  balance: number;
}
