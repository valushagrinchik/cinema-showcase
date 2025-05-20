import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SubCategoryDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [Number] })
  @ValidateNested({ each: true })
  @Type(() => Number)
  filmIds: number[];
}

export class CategoryDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [SubCategoryDto] })
  @ValidateNested({ each: true })
  @Type(() => SubCategoryDto)
  subCategories: SubCategoryDto[];
}

export class CategoriesDto {
  @ApiProperty({ type: [CategoryDto] })
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  data: CategoryDto[];
}
