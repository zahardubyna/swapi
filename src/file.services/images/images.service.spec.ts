import { Test, TestingModule } from '@nestjs/testing';
import { FileImagesService } from './images.service';

describe('ImagesProviderService', () => {
  let service: FileImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileImagesService],
    }).compile();

    service = module.get<FileImagesService>(FileImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
