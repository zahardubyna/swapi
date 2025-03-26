import { Test, TestingModule } from '@nestjs/testing';
import { PlanetController } from './planet.controller';

describe('PlanetController', () => {
  let controller: PlanetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetController],
    }).compile();

    controller = module.get<PlanetController>(PlanetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
