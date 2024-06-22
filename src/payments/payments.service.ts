import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PaymentsRepositoryPort } from './database/payments.repository.port';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentResponseType } from './types/create-payment-response.type';
import { ShopsRepositoryPort } from '../shops/database/shops.repository.port';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PaymentsRepositoryPort) private repository: PaymentsRepositoryPort,
    @Inject(ShopsRepositoryPort) private shopsRepository: ShopsRepositoryPort,
  ) {}

  async create(dto: CreatePaymentDto): Promise<CreatePaymentResponseType> {
    const shop = await this.shopsRepository.getOne(dto.shopId);
    if (!shop) throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    return this.repository.create(dto);
  }
}
