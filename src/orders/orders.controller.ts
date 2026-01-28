/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends Request {
  user: {
    userid: number;
    useremail: string;
    role: string;
  };
}

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Post()
  placeOrder(
    @Req() req: RequestWithUser,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.placeOrder(req.user.userid, dto);
  }


  @Get('my-orders')
  getMyOrders(@Req() req: RequestWithUser) {
    return this.ordersService.getOrdersByUser(req.user.userid);
  }

 
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.ordersService.updateOrderStatus(Number(id), body);
  }
}

