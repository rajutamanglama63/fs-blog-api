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

  async findOne(id: number) {
    const blog = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        thumbnail: true,
      },
    });

    return blog;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
