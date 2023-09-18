import { Module } from '@nestjs/common';
import { BlogLibModule } from 'libs/blog/src';
import { BlogController } from './blog.controller';
import { UserLibModule } from 'libs/user/src';
import { UploadFileLibModule } from 'libs/uploadFile';

@Module({
  imports: [BlogLibModule, UserLibModule, UploadFileLibModule],
  controllers: [BlogController],
})
export class BlogModule {}
