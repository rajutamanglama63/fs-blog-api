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
} from '@nestjs/common';
import { BlogService } from 'libs/blog/src';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';
import { AuthGuard } from 'libs/common/src/guards/auth.guard';
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
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
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
