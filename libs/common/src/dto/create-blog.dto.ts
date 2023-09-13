import { IsArray, IsBoolean, IsString } from 'class-validator';
import { User } from 'libs/models/user.entity';

export class CreateBlogDto {
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

  // @IsString()
  createdBy: string;

  @IsArray()
  tags: string[];

  author: User;
}
