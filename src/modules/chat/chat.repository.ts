import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { ChatMapper } from './chat.mapper';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private mapper: ChatMapper,
  ) {}

  async createMessage(chatDto: ChatDto): Promise<ChatEntity> {
    const newMessage = this.mapper.dtoToEntity(chatDto);
    return this.chatRepository.save(newMessage);
  }

  async findAllMessage(): Promise<ChatEntity[]> {
    return this.chatRepository.find({ relations: ['user'] });
  }
}
