import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { Blog } from 'libs/models/blog.entity';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsOptional()
  blogs?: Blog[];
}
