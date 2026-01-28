/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Req, ForbiddenException, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends Request {
  user: {
    userid: number;
    useremail: string;
    role: string;
  };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @Post('/login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('admin/users')
@UseGuards(AuthGuard('jwt'))
getAllUsers(@Req() req: RequestWithUser) {
  if (req.user.role !== 'Admin') {
    throw new ForbiddenException('Admin access only');
  }
  return this.authService.getAllUsers();
}

@Patch('admin/block/:id')
@UseGuards(AuthGuard('jwt'))
blockUser(
  @Param('id', ParseIntPipe) id: number,
  @Req() req: RequestWithUser,
) {
  if (req.user.role !== 'Admin') {
    throw new ForbiddenException('Admin access only');
  }
  return this.authService.toggleBlockUser(id);
}


}
