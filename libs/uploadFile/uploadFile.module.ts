import { Module } from '@nestjs/common';
import { FileService } from './uploadFile.service';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class UploadFileLibModule {}
