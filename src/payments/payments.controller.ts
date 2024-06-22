import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentResponseType } from './types/create-payment-response.type';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @ApiOperation({ summary: 'Create payment' })
  @ApiResponse({ status: 201, type: CreatePaymentResponseType })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreatePaymentDto): Promise<CreatePaymentResponseType> {
    return this.service.create(dto);
  }
}
