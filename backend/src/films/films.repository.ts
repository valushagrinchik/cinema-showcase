import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Film } from '@prisma/client';

@Injectable()
export class FilmsRepository {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Film[]> {
    return this.prisma.film.findMany({});
  }
}
