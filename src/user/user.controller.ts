import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'libs/common/src/guards/auth.guard';
import { UserService } from 'libs/user/src';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
