import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { BlogModule } from './blog/blog.module';
import { ThumbnailModule } from './thumbnail/thumbnail.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    UserModule,
    AuthModule,
    BlogModule,
    ThumbnailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
