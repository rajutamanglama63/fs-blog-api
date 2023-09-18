import { BadRequestException, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Injectable()
export class FileService {
  constructor() {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('API_KEY'),
      api_secret: configService.get('API_SECRET'),
    });
  }

  async create(fileData: any) {
    try {
      const tempFilePath = './temp';

      // Write the Buffer to the temporary file
      fs.writeFileSync(tempFilePath, fileData.buffer);

      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'fs-blog-thumbnails', // Specify the folder in Cloudinary
      });

      // Remove the temporary file after uploading
      fs.unlinkSync(tempFilePath);

      // Now you can use uploadResult.url or any other information
      // from the Cloudinary response to save or return the URL to your database

      return {
        data: uploadResult.secure_url,
      };
    } catch (error) {
      // Handle any error that might occur during the upload
      console.log('Cloudinary upload error:', error);
      throw new BadRequestException('Error uploading file to Cloudinary');
    }
    // return this.repo.save(createThumbnailDto);
  }
}
