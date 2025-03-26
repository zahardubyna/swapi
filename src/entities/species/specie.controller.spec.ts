import { Test, TestingModule } from '@nestjs/testing';
import { SpecieController } from './specie.controller';

describe('SpecieController', () => {
  let controller: SpecieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecieController],
    }).compile();

    controller = module.get<SpecieController>(SpecieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
