import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly service: SeedService) {}

  @ApiOperation({ summary: 'seed' })
  @ApiResponse({ status: 201 })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  seed() {
    return this.service.seed();
  }
}
