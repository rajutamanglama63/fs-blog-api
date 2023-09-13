import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
  Inject,
  Query,
} from '@nestjs/common';
import { BlogService } from 'libs/blog/src';
import { BlogQueryDto } from 'libs/common/src/dto/blog-qurey.dto';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { PaginationQueryDto } from 'libs/common/src/dto/pagination-query.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';
import { AuthGuard } from 'libs/common/src/guards/auth.guard';
import { Blog } from 'libs/models/blog.entity';
import { ThumbnailService } from 'libs/thumbnail';
import { UserService } from 'libs/user/src';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {
  @Inject(BlogService)
  private readonly blogService: BlogService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(ThumbnailService)
  private readonly thumbnailServive: ThumbnailService;

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Session() session: any) {
    const user = await this.userService.findOne(session.userId);

    createBlogDto.author = user;
    createBlogDto.createdBy = user.fullName;
    return this.blogService.create(createBlogDto);
  }

  @Get('search')
  search(@Query() query: BlogQueryDto): Promise<{ data: Blog[]; total: number }> {
   
    return this.blogService.findSearchedBlog(query);
  }

  @Get()
  findAll(
    @Query() query: PaginationQueryDto,
    @Session() session: any,
  ): Promise<{ data: Blog[]; total: number }> {
    // console.log('active-user: ', session.userId);
    return this.blogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
