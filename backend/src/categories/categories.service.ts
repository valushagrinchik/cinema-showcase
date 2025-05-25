import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesUpdateDto } from './dto/categories.update.dto';

@Injectable()
export class CategoriesService {
  constructor(private catRepo: CategoriesRepository) {}

  async findAll() {
    const categories = await this.catRepo.findAll();
    return categories.map(({ subcategories, parentId, ...cat }) => ({
      ...cat,
      subCategories: subcategories.map(({ films, parentId, ...subcat }) => ({
        ...subcat,
        filmIds: films.map((film) => film.id),
      })),
    }));
  }

  async update(dto: CategoriesUpdateDto) {
    return this.catRepo.update(dto);
  }
}
