import type { CategoryDto } from './api/cinemaShowcaseApi'

export type ActiveCategory = Omit<CategoryDto, 'id'> & { id: number | null }
