import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateProductDto {

    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsString({ message: 'Email must be a string' })
    description: string;

    @IsNumber({}, { message: 'Price must be a number' })
    price: number;

    @IsString({ message: 'Email must be a string' })
    category: string;

    @IsString({ message: 'Email must be a string' })
    brand: string;

    @IsNumber({}, { message: 'Stock must be a number' })
    stock: number;

    @IsNotEmpty({ message: 'Images cannot be empty' })
    images: string[];
}
