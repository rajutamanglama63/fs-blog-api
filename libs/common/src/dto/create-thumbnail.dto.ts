import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Blog } from 'libs/models/blog.entity';

export class CreateThumbnailDto {
  file?: any;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  publicId?: string;

  @IsNumber()
  @IsOptional()
  blogId?: number;

  @IsOptional()
  blog?: Blog;
}
