import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { ChatDto } from '../dto/chat.dto';

//Config Cors
@WebSocketGateway({
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:4200',
      'https://real-chat-client.vercel.app/',
    ],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  users: UserDto[] = [];
  async handleConnection(socket: Socket) {
    // A client has connected
    const user = await this.userService.findUserByNameorCreate(
      socket.handshake.query['name'].toString(),
    );
    this.users.push(user);
    socket.data.user = user;
    const messages = await this.chatService.findAllChat();
    // Notify connected clients of current users
    this.server.emit('users', this.users);
    // Notify history chat
    this.server.emit('messages', messages);
  }

  async handleDisconnect(socket: Socket) {
    //disconect user
    this.users.splice(this.users.indexOf(socket.data.user), 1);
    // Notify connected clients of current users
    this.server.emit('users', this.users);
    socket.disconnect();
  }
  @SubscribeMessage('chat')
  async onChat(client: Socket, message: ChatDto) {
    //save messsage
    message.user = client.data.user;
    const newMessage = await this.chatService.createChat(message);
    //Notify clients of new Message
    client.broadcast.emit('chat', newMessage);
  }
}
