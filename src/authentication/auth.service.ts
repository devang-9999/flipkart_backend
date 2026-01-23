/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
// import { users } from './constants/users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../database/core/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
  ) {}

  async createUser(createAuthDto: CreateAuthDto) {
    const { userid, username, useremail, userPassword, role } = createAuthDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ useremail }, { username }],
    });

    if (existingUser) {
      throw new HttpException(
        { message: 'User already exists' },
        400,
      );
    }

    const newUser = this.userRepository.create({
      userid: userid ?? undefined,
      username,
      useremail,
      userPassword,
      role: role ?? 'User',
    });

    return this.userRepository.save(newUser);
  }

  async findUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userRepository.findOne({
      where: {
        useremail: email,
        userPassword: password,
      },
    });

    if (!user) {
      throw new HttpException(
        { message: 'Invalid credentials' },
        401,
      );
    }

    return true;
  }
}
