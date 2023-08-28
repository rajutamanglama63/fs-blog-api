import { Module } from '@nestjs/common';
import { BlogLibModule } from 'libs/blog/src';
import { BlogController } from './blog.controller';
import { UserLibModule } from 'libs/user/src';
import { ThumbnailLibModule } from 'libs/thumbnail';

@Module({
  imports: [BlogLibModule, UserLibModule, ThumbnailLibModule],
  controllers: [BlogController],
})
export class BlogModule {}
