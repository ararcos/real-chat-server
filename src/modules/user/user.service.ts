import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mapper: UserMapper,
  ) {}

  async findAllUser(): Promise<UserDto[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map((value) => this.mapper.entityToDto(value));
  }

  async findUser(id: string): Promise<UserDto> {
    const user = await this.userRepository.getUserById(id);
    return this.mapper.entityToDto(user);
  }

  async findUserByName(name: string): Promise<UserDto> {
    const user = await this.userRepository.getUserByName(name);
    if (!user) {
      throw new HttpException('Not Content', HttpStatus.NO_CONTENT);
    }
    return this.mapper.entityToDto(user);
  }

  async findUserByNameorCreate(name: string): Promise<UserDto> {
    const user = await this.userRepository.getUserByName(name);
    if (user) {
      return this.mapper.entityToDto(user);
    }
    return this.createUser(new UserDto(undefined, name));
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const user = await this.userRepository.createUser(userDto);
    return this.mapper.entityToDto(user);
  }
}
