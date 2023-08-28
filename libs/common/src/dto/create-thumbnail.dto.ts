import { IsNumber, IsString } from 'class-validator';
import { Blog } from 'libs/models/blog.entity';

export class CreateThumbnailDto {
  @IsString()
  url: string;

  @IsString()
  publicId: string;

  @IsNumber()
  blogId: number;

  blog: Blog;
}
