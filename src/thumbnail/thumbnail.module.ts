import { Module } from '@nestjs/common';
import { ThumbnailController } from './thumbnail.controller';
import { ThumbnailLibModule } from 'libs/thumbnail';
import { BlogLibModule } from 'libs/blog/src';

@Module({
  imports: [ThumbnailLibModule, BlogLibModule],
  controllers: [ThumbnailController],
})
export class ThumbnailModule {}
