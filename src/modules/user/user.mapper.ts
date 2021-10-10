import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper {
  dtoToEntity(userDto: UserDto): UserEntity {
    return new UserEntity(userDto.id, userDto.name);
  }
  entityToDto(userEntity: UserEntity): UserDto {
    return new UserDto(userEntity.userId, userEntity.name);
  }
}
