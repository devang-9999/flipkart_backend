/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from '../database/core/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

async create(createProductDto: CreateProductDto) {
  const product = this.productRepository.create(createProductDto);
  return this.productRepository.save(product);
}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' },
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

    const [data, total] = await this.productRepository.findAndCount({
      where: { category },
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
