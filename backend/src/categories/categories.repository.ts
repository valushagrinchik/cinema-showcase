import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesUpdateDto } from './dto/categories.update.dto';
import { Category } from '@prisma/client';
import { PrismaCategoryList } from '../common/types';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<PrismaCategoryList> {
    return this.prisma.category.findMany({
      where: {
        parent: { is: null },
      },
      include: {
        subcategories: {
          include: {
            films: {
              select: { id: true },
            },
          },
        },
      },
    })
  }

  async update({
    newCategories = [],
    updatedCategories = [],
    deletedCategories = [],
  }: CategoriesUpdateDto): Promise<Category[]> {
    const createQueries = newCategories.map((cat) =>
      this.prisma.category.create({
        data: {
          name: cat.name,
          ...(cat.subCategories.length
            ? {
              subcategories: {
                create: cat.subCategories.map((subcat) => ({
                  name: subcat.name,
                  ...(subcat.filmIds.length
                    ? {
                      films: {
                        connect: subcat.filmIds.map((id) => ({ id })),
                      },
                    }
                    : {}),
                })),
              },
            }
            : {}),
        },
      }),
    );

    const updateQueries = updatedCategories.map(
      ({
        id,
        name,
        subCategories = [],
        updatedSubCategories = [],
        deletedSubCategories = [],
      }) =>
        this.prisma.category.update({
          where: { id },
          data: {
            name,
            subcategories: {
              create: subCategories.map((subcat) => ({
                name: subcat.name,
                ...(subcat.filmIds.length
                  ? {
                    films: {
                      connect: subcat.filmIds.map((id) => ({ id })),
                    },
                  }
                  : {}),
              })),
              update: updatedSubCategories.map((subcat) => ({
                where: {
                  id: subcat.id,
                },
                data: {
                  name: subcat.name,
                  ...(subcat.filmIds.length
                    ? {
                      films: {
                        connect: subcat.filmIds.map((id) => ({ id })),
                      },
                    }
                    : {}),
                },
              })),
              deleteMany: deletedSubCategories.map((subcat) => ({
                id: subcat.id,
              })),
            },
          },
        }),
    );

    const deleteQueries = deletedCategories.map(cat => this.prisma.category.delete({ where: { id: cat.id } }))

    return this.prisma.$transaction([
      ...createQueries,
      ...updateQueries,
      ...deleteQueries
    ])
  }
}
