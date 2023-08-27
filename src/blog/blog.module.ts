import { Module } from '@nestjs/common';
import { BlogLibModule } from 'libs/blog/src';
import { BlogController } from './blog.controller';
import { UserLibModule } from 'libs/user/src';

@Module({
  imports: [BlogLibModule, UserLibModule],
  controllers: [BlogController],
})
export class BlogModule {}
