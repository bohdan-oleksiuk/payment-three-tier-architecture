import { ApiProperty } from '@nestjs/swagger';

export class MakePayoutResponseType {
  @ApiProperty()
  total_payout: number;

  @ApiProperty()
  payouts: PayoutsType[];
}

class PayoutsType {
  @ApiProperty()
  paymentId: string;

  @ApiProperty()
  amount: number;
}
