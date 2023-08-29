import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  BadRequestException,
  Logger,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from 'libs/blog/src';
import { CreateThumbnailDto } from 'libs/common/src/dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from 'libs/common/src/dto/update-thumbnail.dto';
import { ThumbnailService } from 'libs/thumbnail';
import * as multer from 'multer';
import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary

import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

@Controller('thumbnail')
export class ThumbnailController {
  @Inject(ThumbnailService)
  private readonly thumbnailService: ThumbnailService;

  private cloud_img_url: string;
  private cloud_public_id: string;

  @Inject(BlogService)
  private readonly blogService: BlogService;

  constructor() {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('API_KEY'),
      api_secret: configService.get('API_SECRET'),
    });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(), // Store the uploaded file in memory

      fileFilter(req, file, callback) {
        if (!file.mimetype.includes('image')) {
          return callback(new BadRequestException('Invalid file type!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() createThumbnailDto: CreateThumbnailDto,
    @UploadedFile() thumbnailFile: Express.Multer.File, // Access the uploaded file
  ) {
    try {
      const tempFilePath = './temp';

      // Write the Buffer to the temporary file
      fs.writeFileSync(tempFilePath, thumbnailFile.buffer);

      Logger.log('path: ', tempFilePath);

      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'fs-blog-thumbnails', // Specify the folder in Cloudinary
      });

      // Remove the temporary file after uploading
      fs.unlinkSync(tempFilePath);

      // Now you can use uploadResult.url or any other information
      // from the Cloudinary response to save the URL to your database
      console.log('Cloudinary upload result:', uploadResult);

      const relatedBlog = await this.blogService.findOne(
        createThumbnailDto.blogId,
      );
      createThumbnailDto.url = uploadResult.secure_url;
      createThumbnailDto.publicId = uploadResult.public_id;
      createThumbnailDto.blog = relatedBlog;
      return this.thumbnailService.create(createThumbnailDto);
    } catch (error) {
      // Handle any error that might occur during the upload
      Logger.log('Cloudinary upload error:', error);
      throw new BadRequestException('Error uploading file to Cloudinary');
    }
  }

  @Get()
  findAll() {
    return this.thumbnailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thumbnailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateThumbnailDto: UpdateThumbnailDto,
  ) {
    return this.thumbnailService.update(+id, updateThumbnailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thumbnailService.remove(+id);
  }
}
