import { UserDto } from '../../user/dto/user.dto';
export class ChatDto {
  readonly id?: string;
  user?: UserDto;
  readonly message: string;
  readonly createAt?: Date;
  constructor(id, message, user, createAt) {
    this.id = id;
    this.message = message;
    this.user = user;
    this.createAt = createAt;
  }
}
