import { IsArray, IsBoolean, IsString } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsString()
  meta: string;

  @IsString()
  slug: string;

  @IsBoolean()
  featured: boolean;

  @IsArray()
  tags: string[];
}
