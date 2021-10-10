import { Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { ChatEntity } from './chat.entity';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class ChatMapper {
  //transform DTo to Entity
  dtoToEntity(chatDto: ChatDto): ChatEntity {
    const user = new UserEntity(chatDto.user.id, chatDto.user.name);
    return new ChatEntity(chatDto.id, chatDto.message, user, chatDto.createAt);
  }
  //transform  Entity to DTo

  entityToDto(chatEntity: ChatEntity): ChatDto {
    const user = new UserDto(undefined, chatEntity.user.name);
    return new ChatDto(
      chatEntity.id,
      chatEntity.message,
      user,
      chatEntity.create_at,
    );
  }
}
