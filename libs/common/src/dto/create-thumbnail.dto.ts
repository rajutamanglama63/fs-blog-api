import { IsString } from 'class-validator';

export class CreateThumbnailDto {
  @IsString()
  url: string;

  @IsString()
  publicId: string;
}
