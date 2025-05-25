import { Category } from '@prisma/client';

export type PrismaCategoryList = (Category & {
  subcategories: (Category & { films: { id: number }[] })[];
})[];
