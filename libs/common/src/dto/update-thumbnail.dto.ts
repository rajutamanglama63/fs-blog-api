import { PartialType } from '@nestjs/mapped-types';
import { CreateThumbnailDto } from './create-thumbnail.dto';
import { IsString } from 'class-validator';

export class UpdateThumbnailDto extends PartialType(CreateThumbnailDto) {
  @IsString()
  url: string;

  @IsString()
  publicId: string;
}
