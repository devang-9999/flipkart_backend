/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { users } from './constants/users';

@Injectable()
export class AuthService {
 createUser(createAuthDto: CreateAuthDto) {
  const {
    userid,
    username,
    useremail,
    userpassword,
    role,
  } = createAuthDto;

  const existingEmail = users.some(u => u.useremail === useremail);
  const existingUsername = users.some(u => u.username === username);

  if (existingEmail) {
    throw new HttpException({ message: 'Email already in use' }, 400);
  }

  if (existingUsername) {
    throw new HttpException({ message: 'Username already in use' }, 400);
  }

  const newUser = {
    userid: userid ?? Date.now(),
    username,
    useremail,
    userpassword,
    role: role ?? 'User',
  };

  users.push(newUser);
  return newUser;
}

findUser(loginAuthDto: LoginAuthDto) {
  const { email, password } = loginAuthDto;

  const user = users.find(
    u => u.useremail === email && u.userpassword === password,
  );

  if (!user) {
    throw new HttpException({ message: 'Invalid credentials' }, 401);
  }

  return user;
}

}
