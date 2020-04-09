import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository, ObjectID } from 'typeorm';
import { UserInput } from './user.input';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userID: string): Promise<User> {
    Logger.log('run findOne');
    return await this.userRepository.findOne({ _id: userID });
  }

  async create(input: UserInput): Promise<any> {
    Logger.log('run create account');

    const user = new User();
    user._id = uuid.v4();
    user.username = input.username;
    user.password = input.password;

    let rs;
    try {
      rs = await this.userRepository.save(user);
    } catch (error) {
      Logger.error(error.code, `mess =>: ${error.errmsg}`);
      throw new HttpException(
        `${
          error.code === 11000
            ? user.username + ' already exists'
            : 'bad request'
        }`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return rs;
  }
}
