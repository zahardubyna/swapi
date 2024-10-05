import { Test, TestingModule } from '@nestjs/testing';
import { StarshipService } from './starship.service';

describe('StarshipsService', () => {
  let service: StarshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipService],
    }).compile();

    service = module.get<StarshipService>(StarshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
