import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper {
  //transform DTo to Entity
  dtoToEntity(userDto: UserDto): UserEntity {
    return new UserEntity(userDto.id, userDto.name);
  }
  //transform Entity to DTo
  entityToDto(userEntity: UserEntity): UserDto {
    return new UserDto(userEntity.userId, userEntity.name);
  }
}
