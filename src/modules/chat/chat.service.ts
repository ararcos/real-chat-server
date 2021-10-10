import { Injectable } from '@nestjs/common';
import { ChatMapper } from './chat.mapper';
import { ChatRepository } from './chat.repository';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    private chatRepository: ChatRepository,
    private mapper: ChatMapper,
  ) {}

  async createChat(chatDto: ChatDto): Promise<ChatDto> {
    const chat = await this.chatRepository.createMessage(chatDto);
    return this.mapper.entityToDto(chat);
  }

  async findAllChat(): Promise<ChatDto[]> {
    const chats = await this.chatRepository.findAllMessage();
    if (chats) {
      return chats.map((value) => this.mapper.entityToDto(value));
    }
    return [];
  }
}
