import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ShopsRepositoryPort } from './shops.repository.port';
import { ShopEntity } from '../entities/shop.entity';
import { CreateShopDto } from '../dto/create-shop.dto';
import { randomUUID } from 'crypto';
import { CreateShopResponseType } from '../types/create-shop-response.type';

@Injectable()
export class ShopsRepository implements ShopsRepositoryPort {
  private shops_repo = {};
  private readonly logger = new Logger(ShopsRepository.name);

  async create(dto: CreateShopDto): Promise<CreateShopResponseType> {
    try {
      const shop = new ShopEntity();
      shop.id = randomUUID();
      shop.name = dto.name;
      shop.service_fee = dto.service_fee;
      shop.balance = 0;
      this.shops_repo[shop.id] = shop;

      return { id: shop.id };
    } catch (e) {
      this.logger.error(`Error while create shop: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<ShopEntity[] | []> {
    try {
      return Object.values(this.shops_repo);
    } catch (e) {
      this.logger.error(`Error while get all shops: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  async getOne(id: string): Promise<ShopEntity | null> {
    try {
      return this.shops_repo[id];
    } catch (e) {
      this.logger.error(`Error while get one shop: ${e}`);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
