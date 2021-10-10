import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService.findAllUser();
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findUser(id);
  }
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.createUser(userDto);
  }
  @Get('name/:name')
  async getUserName(@Param('name') name: string): Promise<UserDto> {
    return await this.userService.findUserByName(name);
  }
}
