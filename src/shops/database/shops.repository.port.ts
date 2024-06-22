import { CreateShopDto } from '../dto/create-shop.dto';
import { ShopEntity } from '../entities/shop.entity';
import { CreateShopResponseType } from '../types/create-shop-response.type';

export abstract class ShopsRepositoryPort {
  abstract create(dto: CreateShopDto): Promise<CreateShopResponseType>;
  abstract getAll(): Promise<ShopEntity[] | []>;
  abstract getOne(id: string): Promise<ShopEntity | null>;
}
