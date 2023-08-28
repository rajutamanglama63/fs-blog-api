import { Module } from '@nestjs/common';
import { ThumbnailService } from './thumbnail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thumbnail } from 'libs/models/thumbnail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thumbnail])],
  providers: [ThumbnailService],
  exports: [ThumbnailService],
})
export class ThumbnailLibModule {}
