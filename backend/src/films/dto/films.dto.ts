import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class FilmDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class FilmsDto {
  @ApiProperty({ type: [FilmDto] })
  @ValidateNested({ each: true })
  @Type(() => FilmDto)
  data: FilmDto[];
}
