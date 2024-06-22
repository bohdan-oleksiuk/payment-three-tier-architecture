import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentResponseType } from './types/create-payment-response.type';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProcessPaymentsDto } from './dto/process-payments.dto';
import { ChangePaymentResponseType } from './types/change-payment-response.type';
import { CompletePaymentsDto } from './dto/complete-payments.dto';

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

  @ApiOperation({ summary: 'Process payments' })
  @ApiResponse({ status: 201, type: ChangePaymentResponseType })
  @HttpCode(HttpStatus.CREATED)
  @Post('process')
  processPayments(
    @Body() dto: ProcessPaymentsDto,
  ): Promise<ChangePaymentResponseType> {
    return this.service.processPayments(dto);
  }

  @ApiOperation({ summary: 'Complete payments' })
  @ApiResponse({ status: 201, type: ChangePaymentResponseType })
  @HttpCode(HttpStatus.CREATED)
  @Post('complete')
  completePayments(
    @Body() dto: CompletePaymentsDto,
  ): Promise<ChangePaymentResponseType> {
    return this.service.completePayments(dto);
  }
}
