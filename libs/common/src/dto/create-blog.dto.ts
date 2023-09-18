import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { User } from 'libs/models/user.entity';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsString()
  meta: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsBoolean()
  featured: boolean;

  // @IsString()
  createdBy: string;

  @IsString()
  thumbnail: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsArray()
  tags: string[];

  author: User;
}
