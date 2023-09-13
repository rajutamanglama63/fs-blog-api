import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQueryDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => value && Number.parseInt(value, 10))
  offset?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => value && Number.parseInt(value, 10))
  limit?: number;

  @IsInt()
  @IsOptional()
  order?: OrderEnum;

  @IsString()
  @IsOptional()
  title?: string;
}
