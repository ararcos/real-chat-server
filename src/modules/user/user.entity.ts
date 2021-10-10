import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from '../chat/chat.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly userId: string;

  @Column({
    unique: true,
  })
  readonly name: string;
  @OneToMany(() => ChatEntity, (message) => message.user, { cascade: true })
  messages: ChatEntity[];

  constructor(userId: string, name: string) {
    this.name = name;
    this.userId = userId;
  }
}
