import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly message: string;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn()
  readonly user: UserEntity;

  @CreateDateColumn()
  readonly create_at: Date;

  constructor(id, message, user, create_at) {
    this.id = id;
    this.message = message;
    this.user = user;
    this.create_at = create_at;
  }
}
