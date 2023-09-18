import { Test, TestingModule } from '@nestjs/testing';
import { fileController } from './uploadFile.controller';
import { UploadFileLibModule } from 'libs/uploadFile';

describe('ThumbnailController', () => {
  let controller: fileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [fileController],
      providers: [UploadFileLibModule],
    }).compile();

    controller = module.get<fileController>(fileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
