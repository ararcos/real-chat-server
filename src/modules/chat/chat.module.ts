import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './chat.service';
import { ChatMapper } from './chat.mapper';
import { ChatRepository } from './chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), UserModule],
  providers: [ChatGateway, ChatService, ChatRepository, ChatMapper],
})
export class ChatModule {}
