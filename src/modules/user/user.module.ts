import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserRepository],
  exports: [UserService],
})
export class UserModule {}
