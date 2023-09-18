import {
  Controller,
  Post,
  Inject,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'libs/uploadFile';

import * as multer from 'multer';

@Controller('upload-file')
export class fileController {
  @Inject(FileService)
  private readonly fileService: FileService;

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(), // Store the uploaded file in memory

      fileFilter(req, file, callback) {
        if (!file.mimetype.includes('image')) {
          return callback(new BadRequestException('Invalid file type!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() fileData: Express.Multer.File, // Access the uploaded file
  ) {
    return this.fileService.create(fileData);
  }
}
