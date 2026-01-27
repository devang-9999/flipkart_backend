/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Auth } from 'src/database/core/auth.entity';
import { Products } from 'src/database/core/products.entity';
import { Orders } from 'src/database/core/order.entity';
import { OrderItem } from 'src/database/core/order-item.entity';
import { Cart } from 'src/database/core/cart.entity';
import { CartItem } from 'src/database/core/cart-item.entity';


dotenv.config();

const rawDataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [    Auth,
    Orders,
    OrderItem,
    Cart,
    CartItem,
    Products,],
     migrations: [__dirname + "../database/migrations/*.ts"],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;