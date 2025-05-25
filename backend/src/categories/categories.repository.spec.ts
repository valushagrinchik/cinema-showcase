import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from './categories.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaCategoryList } from '../common/types';

describe('CategoriesRepository', () => {
  let service: CategoriesRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CategoriesRepository, PrismaService],
    }).compile();

    service = module.get<CategoriesRepository>(CategoriesRepository);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.category.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let createdCategories: PrismaCategoryList;

  describe('.update', () => {
    it('should create new categories with newCategories provided', async () => {
      const newCategories = [
        {
          name: 'Cat1',
          subCategories: [],
        },
        {
          name: 'Cat2',
          subCategories: [
            {
              name: 'SubCat2',
              filmIds: [],
            },
            {
              name: 'SubCat3',
              filmIds: [1, 2],
            },
          ],
        },
      ];
      await service.update({
        newCategories,
      });
      const res = await service.findAll();

      console.log(res, 'res');
      createdCategories = res;
      expect(res.length).toEqual(2);
      expect(res[0].name).toEqual(newCategories[0].name);
      expect(res[1].name).toEqual(newCategories[1].name);
      expect(res[0].subcategories.length).toEqual(0);
      expect(res[1].subcategories.length).toEqual(2);
      expect(res[1].subcategories[0].name).toEqual(
        newCategories[1].subCategories[0].name,
      );
      expect(res[1].subcategories[1].name).toEqual(
        newCategories[1].subCategories[1].name,
      );
    });

    it('should update categories with updatedCategories provided', async () => {
      const updatedSubCatId = createdCategories[1].subcategories[0].id;
      const updatedCategories = [
        {
          id: createdCategories[0].id,
          name: 'Cat1',
          subCategories: [],
        },
        {
          id: createdCategories[1].id,
          name: 'Cat22',
          subCategories: [
            {
              name: 'SubCat22',
              filmIds: [],
            },
            {
              name: 'SubCat23',
              filmIds: [1, 2],
            },
          ],
          updatedSubCategories: [
            {
              id: updatedSubCatId,
              name: 'SubCat224',
              filmIds: [],
            },
          ],
        },
      ];
      await service.update({
        updatedCategories,
      });
      const res = await service.findAll();

      expect(res.length).toEqual(2);
      expect(res.map((cat) => cat.name)).toEqual(
        updatedCategories.map((cat) => cat.name),
      );
      expect(res[0].subcategories.length).toEqual(0);
      expect(res[1].subcategories.length).toEqual(4);
      expect(
        res[1].subcategories.find((subcat) => subcat.id == updatedSubCatId)
          ?.name,
      ).toEqual('SubCat224');
    });

    it('should delete categories with updatedCategories provided', async () => {
      const deletedCategories = [
        {
          id: createdCategories[1].id,
        },
      ];

      await service.update({
        deletedCategories,
      });

      const res = await service.findAll();

      expect(res.length).toEqual(1);
      expect(res[0].name).toEqual(createdCategories[0].name);
    });
  });
});
