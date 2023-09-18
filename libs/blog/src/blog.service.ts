import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogQueryDto } from 'libs/common/src/dto/blog-qurey.dto';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { PaginationQueryDto } from 'libs/common/src/dto/pagination-query.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';
import { Blog } from 'libs/models/blog.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private repo: Repository<Blog>) {}

  create(createBlogDto: CreateBlogDto) {
    return this.repo.save(createBlogDto);
  }

  async findAll(query: PaginationQueryDto) {
    const { offset, limit } = query || {};
    const result = await this.repo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        author: true,
      },
      take: limit ?? 10,
      skip: offset ?? 0,
    });

    return {
      data: result[0] ?? [],
      total: result[1] ?? 0,
    };
  }

  async findSearchedBlog(query: BlogQueryDto) {
    const { name, limit, offset } = query ?? {};

    // Input validation
    const validatedLimit = Number.isInteger(limit) && limit >= 0 ? limit : 10;
    const validatedOffset =
      Number.isInteger(offset) && offset >= 0 ? offset : 0;

    const searchCriteria: any = {};

    if (name) {
      searchCriteria.title = Like(`%${name}%`);
    }

    const searchResults = await this.repo.findAndCount({
      where: searchCriteria,
      order: {
        createdAt: 'DESC',
      },
      take: validatedLimit,
      skip: validatedOffset,
    });

    return {
      data: searchResults[0] ?? [],
      total: searchResults[1] ?? 0,
    };
  }
  async findOne(id: number) {
    const blog = await this.repo.findOne({
      where: {
        id,
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
