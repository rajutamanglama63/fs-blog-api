import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'libs/common/src/dto/create-user.dto';
import { UserService } from 'libs/user/src';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(userDto: CreateUserDto) {
    // see if user already exist
    const users = await this.userService.find(userDto.email);
    if (users.length) {
      throw new BadRequestException('User already exist!');
    }

    // generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password together
    // typescript have no idea what is the return type of hash so, we are explictly telling typescrypt it's return type as Buffer
    const hash = (await scrypt(userDto.password, salt, 32)) as Buffer;

    // join the hash result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create or register a new user
    userDto.password = result;
    const newUser = await this.userService.create(userDto);

    return newUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials!');
    }
    return user;
  }
}
