/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: number, updateUser: Partial<User>): User | undefined {
    const user = this.users.find((u) => u.userId === id);
    if (!user) return undefined;

    Object.assign(user, updateUser);
    return user;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((u) => u.userId === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}
