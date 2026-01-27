/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends Request {
  user: {
    userid: number;
    useremail: string;
    role: string;
  };
}

@Controller('cart')
@UseGuards(AuthGuard('jwt'))

export class CartController {
  constructor(private readonly cartService: CartService) {}

  
  @Post()
  addToCart(
    @Req() req: RequestWithUser,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addToCart(req.user.userid, dto);
  }

  @Get('my-cart')
  getMyCart(@Req() req: RequestWithUser) {
    return this.cartService.getMyCart(req.user.userid);
  }

  @Delete(':productId')
  removeItem(
    @Req() req: RequestWithUser,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeItem(
      req.user.userid,
      Number(productId),
    );
  }

  @Delete()
  clearCart(@Req() req: RequestWithUser) {
    return this.cartService.clearCart(req.user.userid);
  }
}
