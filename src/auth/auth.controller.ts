import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from 'libs/auth/src';
import { CreateUserDto } from 'libs/common/src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);

    session.isAuth = true;
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);

    session.isAuth = true;
    session.userId = user.id;

    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.isAuth = false;
    session.userId = null;

    return 'Signout successfully.';
  }
}
