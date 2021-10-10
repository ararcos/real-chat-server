import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private mapper: UserMapper,
  ) {}
  //Find all users
  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  //Find user by id
  getUserById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  //Find user by name unique
  getUserByName(name: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('"name" = :name', { name })
      .getOne();
  }

  //save new User
  createUser(userDto: UserDto): Promise<UserEntity> {
    const newUser = this.mapper.dtoToEntity(userDto);
    return this.userRepository.save(newUser);
  }
}
