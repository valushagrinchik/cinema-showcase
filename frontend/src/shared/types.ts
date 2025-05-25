import type { CategoryDto, SubCategoryDto } from './api/cinemaShowcaseApi'

export type ActiveCategory = Omit<CategoryDto, 'id' | 'subCategories'> & { id: number | string, subCategories: (Omit<SubCategoryDto, 'id'> & { id: number | string })[] }
