/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { products } from './constants/products';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    console.log(createProductDto)
    const { name, description, price, category, brand, stock, images } = createProductDto;
    const newProduct = {
      id: Date.now(),
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
    };
    console.log(newProduct)
    products.push(newProduct)
    return newProduct;
  }


  findAll() {
    return [...products]; 
  }

 
  findOne(id: number) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  findByCategory(category: string) {
    return products.filter((p) => p.category === category);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }
   const updatedProduct = {
      ...products[index],
      ...updateProductDto,
    };

    products[index] = updatedProduct;
    return updatedProduct;
  
}

}
