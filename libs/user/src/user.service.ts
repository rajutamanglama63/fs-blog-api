import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'libs/common/src/dto/create-user.dto';
import { User } from 'libs/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(newUserData: CreateUserDto) {
    return this.repo.save(newUserData);
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email,
      },
    });
  }

  findAll() {
    return this.repo.find();
  }
}
