import { Module } from '@nestjs/common';
import { fileController } from './uploadFile.controller';
import { UploadFileLibModule } from 'libs/uploadFile';
import { BlogLibModule } from 'libs/blog/src';

@Module({
  imports: [UploadFileLibModule, BlogLibModule],
  controllers: [fileController],
})
export class UploadFileModule {}
