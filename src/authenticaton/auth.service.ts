/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { users } from './constants/users';

@Injectable()
export class AuthService {
  createUser(createAuthDto: CreateAuthDto) {
    const { userid, username, useremail, userpassword, role } = createAuthDto;

    const existingEmail = users.some((u) => u.useremail === useremail);

    const existingUsername = users.some((u) => u.username === username);

    const uid = userid ? userid : Date.now();

    const userRole = role ? role : 'customer';
    
    if (existingEmail) {
      throw new HttpException({ message: 'Email already in use' }, 400);
    }
    if (existingUsername) {
      throw new HttpException({ message: 'Username already in use' }, 400);
    }
    const newUser = {
      userid: uid,
      username,
      useremail,
      userpassword,
      role: userRole,
    };

    users.push(newUser);

    return newUser;
  }

  findUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const existingUser = users.some(
      (u) => u.useremail === email && u.userpassword === password,
    );
    if (!existingUser) {
      throw new HttpException({ message: 'Invalid credentials' }, 404);
    }
    return existingUser;
  }

 async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

}
