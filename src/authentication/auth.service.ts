/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from '../database/core/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,

    private jwtService: JwtService,
  ) {}

  async createUser(createAuthDto: CreateAuthDto) {
    const { userid, username, useremail, userPassword, role } = createAuthDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ useremail }, { username }],
    });

    if (existingUser) {
      throw new HttpException({ message: 'User already exists' }, 400);
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


  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userRepository.findOne({
      where: {
        useremail: email,
        userPassword: password,
      },
    });

    if (!user) {
      throw new HttpException({ message: 'Invalid credentials' }, 401);
    }

    const payload = {
      userid: user.userid,
      useremail: user.useremail,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
