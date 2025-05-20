import { Body, Controller, Get, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesUpdateDto } from './dto/categories.update.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesDto } from './dto/categories.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private servise: CategoriesService) { }

  @Get()
  @ApiResponse({ status: 200, type: CategoriesDto })
  async list() {
    return { data: await this.servise.findAll() }
  }

  @Put()
  update(@Body() dto: CategoriesUpdateDto) {
    return this.servise.update(dto);
  }
}
