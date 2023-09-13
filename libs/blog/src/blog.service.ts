import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { PaginationQueryDto } from 'libs/common/src/dto/pagination-query.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';
import { Blog } from 'libs/models/blog.entity';
import { Repository } from 'typeorm';

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
        thumbnail: true,
      },
      take: limit ?? 10,
      skip: offset ?? 0,
    });

    return {
      data: result[0] ?? [],
      total: result[1] ?? 0,
    };
  }

  async findSearchedBlog(query: PaginationQueryDto) {
    const { title } = query;
    console.log('title: ', title);

    // Build your query dynamically based on the title parameter
    const queryBuilder = this.repo.createQueryBuilder('blog');
    // .orderBy('blog.createdAt', 'DESC');

    if (title) {
      queryBuilder.where('blog.title LIKE :title OR blog.desc LIKE :title', {
        title: `%${title}%`,
      });
    }

    const result = await queryBuilder.getMany();

    return result;
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
