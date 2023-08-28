import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { BlogService } from 'libs/blog/src';
import { CreateThumbnailDto } from 'libs/common/src/dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from 'libs/common/src/dto/update-thumbnail.dto';
import { ThumbnailService } from 'libs/thumbnail';

@Controller('thumbnail')
export class ThumbnailController {
  @Inject(ThumbnailService)
  private readonly thumbnailService: ThumbnailService;

  @Inject(BlogService)
  private readonly blogService: BlogService;

  @Post()
  async create(@Body() createThumbnailDto: CreateThumbnailDto) {
    const relatedBlog = await this.blogService.findOne(
      createThumbnailDto.blogId,
    );
    createThumbnailDto.blog = relatedBlog;
    return this.thumbnailService.create(createThumbnailDto);
  }

  @Get()
  findAll() {
    return this.thumbnailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thumbnailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateThumbnailDto: UpdateThumbnailDto,
  ) {
    return this.thumbnailService.update(+id, updateThumbnailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thumbnailService.remove(+id);
  }
}
