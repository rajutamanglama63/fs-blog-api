import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';

@Injectable()
export class BlogService {
  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new post';
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
