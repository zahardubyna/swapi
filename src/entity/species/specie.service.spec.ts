import { Test, TestingModule } from '@nestjs/testing';
import { SpecieService } from './specie.service';

describe('SpecieService', () => {
  let service: SpecieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecieService],
    }).compile();

    service = module.get<SpecieService>(SpecieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
