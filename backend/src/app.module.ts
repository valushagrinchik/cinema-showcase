import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, FilmsModule, CategoriesModule],
})
export class AppModule {}
