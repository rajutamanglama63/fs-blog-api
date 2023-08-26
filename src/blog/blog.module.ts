import { Module } from '@nestjs/common';
import { BlogLibModule } from 'libs/blog/src';
import { BlogController } from './blog.controller';

@Module({
  imports: [BlogLibModule],
  controllers: [BlogController],
})
export class BlogModule {}
