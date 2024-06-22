import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ShopsRepositoryPort } from './database/shops.repository.port';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopEntity } from './entities/shop.entity';
import { CreateShopResponseType } from './types/create-shop-response.type';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(ShopsRepositoryPort) private repository: ShopsRepositoryPort,
  ) {}

  async create(dto: CreateShopDto): Promise<CreateShopResponseType> {
    return this.repository.create(dto);
  }

  async getAll(): Promise<ShopEntity[] | []> {
    return this.repository.getAll();
  }

  async getOne(id: string): Promise<ShopEntity> {
    const item = await this.repository.getOne(id);
    if (!item) throw new NotFoundException('Shop not found');
    return item;
  }
}
