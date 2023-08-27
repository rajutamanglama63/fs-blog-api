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
} from '@nestjs/common';
import { BlogService } from 'libs/blog/src';
import { CreateBlogDto } from 'libs/common/src/dto/create-blog.dto';
import { UpdateBlogDto } from 'libs/common/src/dto/update-blog.dto';
import { AuthGuard } from 'libs/common/src/guards/auth.guard';
import { UserService } from 'libs/user/src';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly userService: UserService,
  ) {}

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
