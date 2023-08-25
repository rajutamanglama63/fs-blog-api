import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLibModule } from 'libs/auth/src';

@Module({
  imports: [AuthLibModule],
  controllers: [AuthController],
})
export class AuthModule {}
