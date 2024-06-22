import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentResponseType {
  @ApiProperty()
  id: string;
}
