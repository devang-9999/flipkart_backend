/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { Orders } from 'src/database/core/order.entity';
import { Cart } from 'src/database/core/cart.entity';
import { CartItem } from 'src/database/core/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      Cart,
      CartItem,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
