import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateThumbnailDto } from 'libs/common/src/dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from 'libs/common/src/dto/update-thumbnail.dto';
import { Thumbnail } from 'libs/models/thumbnail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThumbnailService {
  constructor(
    @InjectRepository(Thumbnail) private repo: Repository<Thumbnail>,
  ) {}

  create(createThumbnailDto: CreateThumbnailDto) {
    return this.repo.save(createThumbnailDto);
  }

  findAll() {
    return `This action returns all thumbnail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thumbnail`;
  }

  update(id: number, updateThumbnailDto: UpdateThumbnailDto) {
    return `This action updates a #${id} thumbnail`;
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
