import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeesService } from './fees.service';
import { FeeEntity } from './entities/fee.entity';
import { UpdateFeesDto } from './dto/update-fees.dto';

@ApiTags('fees')
@Controller('fees')
export class FeesController {
  constructor(private readonly service: FeesService) {}

  @ApiOperation({ summary: 'Get fees' })
  @ApiResponse({ status: 200, type: FeeEntity })
  @HttpCode(HttpStatus.OK)
  @Get()
  get(): Promise<FeeEntity> {
    return this.service.get();
  }

  @ApiOperation({ summary: 'Update fees' })
  @ApiResponse({ status: 201, type: FeeEntity })
  @HttpCode(HttpStatus.CREATED)
  @Put()
  update(@Body() dto: UpdateFeesDto) {
    return this.service.update(dto);
  }
}
