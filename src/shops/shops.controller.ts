import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopEntity } from './entities/shop.entity';
import { CreateShopResponseType } from './types/create-shop-response.type';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly service: ShopsService) {}

  @ApiOperation({ summary: 'Create shop' })
  @ApiResponse({ status: 201, type: CreateShopResponseType })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateShopDto): Promise<CreateShopResponseType> {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get shops' })
  @ApiResponse({ status: 200, type: [ShopEntity] })
  @HttpCode(HttpStatus.OK)
  @Get()
  get(): Promise<ShopEntity[]> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiResponse({ status: 200, type: ShopEntity })
  @ApiResponse({ status: 404, description: 'Not found Error' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ShopEntity> {
    return this.service.getOne(id);
  }
}
