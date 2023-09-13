import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "./pagination-query.dto";

export class BlogQueryDto extends PaginationQueryDto {
    @IsString()
    @IsOptional()
    name?: string;
  
 
  }