/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from '../database/core/products.entity';
import { ILike } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) { }

  // async create(createProductDto: CreateProductDto) {
  //   const product = this.productRepository.create(createProductDto);
  //   return this.productRepository.save(product);
  // }
async createProductBySeller(
  sellerId: number,
  role: string,
  dto: CreateProductDto,
) {
  if (role.toUpperCase() !== 'SELLER')
 {
    throw new BadRequestException('Only sellers can create products')
  }

  const product = this.productRepository.create({
    ...dto,
    seller: { userid: sellerId }, 
  });

  return this.productRepository.save(product);
}

  async findAll(page = 1, limit = 14) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async getProductsBySeller(sellerId: number, role: string) {
  if (role !== 'SELLER') {
    throw new BadRequestException('Only sellers can view this');
  }

  return this.productRepository.find({
    where: { seller: { userid: sellerId } },
    order: { id: 'DESC' },
  });
}

async updateProductBySeller(
  productId: number,
  sellerId: number,
  role: string,
  dto: UpdateProductDto,
) {
  if (role !== 'SELLER') {
    throw new BadRequestException('Only sellers can update products');
  }

  const product = await this.productRepository.findOne({
    where: { id: productId },
    relations: ['seller'],
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.seller.userid !== sellerId) {
    throw new BadRequestException('You can update only your own products');
  }

  Object.assign(product, dto);
  return this.productRepository.save(product);
}


  async searchProducts(
    searchTerm: string,
    page = 1,
    limit = 14,
  ) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      where: {
        name: ILike(`%${searchTerm}%`),
      },
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      data,
      page,
      limit,
      total,
    };
  }


  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findByCategory(category: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const normalizedCategory = category.trim().toUpperCase();

    const [data, total] = await this.productRepository.findAndCount({
      where: { category: normalizedCategory },
      skip,
      take: limit,
    });

    return {
      data,
      page,
      limit,
      total,
    };
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = this.productRepository.merge(
      product,
      updateProductDto,
    );

    return this.productRepository.save(updatedProduct);
  }
}
