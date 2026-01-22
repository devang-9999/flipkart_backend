/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as userEntity from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): userEntity.User {
    return this.usersService.create({
      userId: Date.now(),
      ...createUserDto,
    });
  }

  @Get()
  findAll(): userEntity.User[] {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): userEntity.User | undefined {
    return this.usersService.findOne(username);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): userEntity.User | undefined {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.usersService.remove(+id);
  }
}
