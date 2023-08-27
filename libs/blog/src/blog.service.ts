import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';
import { Blog } from 'libs/models/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private repo: Repository<Blog>) {}

  create(createBlogDto: CreateBlogDto) {
    return this.repo.save(createBlogDto);
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
