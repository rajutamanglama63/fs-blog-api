import { Module } from '@nestjs/common';
import { UserLibModule } from 'libs/user/src';
import { UsersController } from './user.controller';

@Module({
  imports: [UserLibModule],
  controllers: [UsersController],
})
export class UserModule {}
