import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepo: FilmsRepository) {}

  findAll() {
    return this.filmsRepo.findAll();
  }
}
