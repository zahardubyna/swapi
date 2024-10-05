import { Test, TestingModule } from '@nestjs/testing';
import { FilmService } from './film.service';

describe('FilmsService', () => {
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmService],
    }).compile();

    service = module.get<FilmService>(FilmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
