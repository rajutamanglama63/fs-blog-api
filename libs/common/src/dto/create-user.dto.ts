import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
