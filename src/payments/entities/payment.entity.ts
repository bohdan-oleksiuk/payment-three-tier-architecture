import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatusEnum } from '../types/payment-status.enum';

export class PaymentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  shopId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  status: PaymentStatusEnum;
}
