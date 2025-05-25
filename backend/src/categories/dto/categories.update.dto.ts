import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SubCategoryCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [Number] })
  @Type(() => Number)
  filmIds: number[];
}

export class SubCategoryUpdateDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [Number] })
  @Type(() => Number)
  filmIds: number[];
}

export class SubCategoryDeleteDto {
  @ApiProperty()
  id: number;
}

export class CategoryCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [SubCategoryCreateDto] })
  @ValidateNested({ each: true })
  @Type(() => SubCategoryCreateDto)
  subCategories: SubCategoryCreateDto[];
}

export class CategoryUpdateDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [SubCategoryCreateDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => SubCategoryCreateDto)
  subCategories?: SubCategoryCreateDto[];

  @ApiProperty({ type: [SubCategoryUpdateDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => SubCategoryUpdateDto)
  updatedSubCategories?: SubCategoryUpdateDto[];

  @ApiProperty({ type: [SubCategoryDeleteDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => SubCategoryDeleteDto)
  deletedSubCategories?: SubCategoryDeleteDto[];
}

export class CategoryDeleteDto extends SubCategoryDeleteDto {}

export class CategoriesUpdateDto {
  @ApiProperty({ type: [CategoryCreateDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => CategoryCreateDto)
  newCategories?: CategoryCreateDto[];

  @ApiProperty({ type: [CategoryUpdateDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => CategoryUpdateDto)
  updatedCategories?: CategoryUpdateDto[];

  @ApiProperty({ type: [CategoryDeleteDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => CategoryDeleteDto)
  deletedCategories?: CategoryDeleteDto[];
}
