import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilmsDto } from './dto/films.dto';

@Controller('films')
@ApiTags('Films')
export class FilmsController {
  constructor(private servise: FilmsService) {}

  @Get()
  @ApiResponse({ status: 200, type: FilmsDto })
  async list() {
    return { data: await this.servise.findAll() };
  }
}
