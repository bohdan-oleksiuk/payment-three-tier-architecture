import { ApiProperty } from '@nestjs/swagger';

export class ChangePaymentResponseType {
  @ApiProperty()
  status: string;
}
