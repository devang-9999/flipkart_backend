/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

@Post()
@UseGuards(AuthGuard('jwt'))
createProductBySeller(
  @Req() req: RequestWithUser,
  @Body() createProductDto: CreateProductDto,
) {
  return this.productsService.createProductBySeller(
    req.user.id,
    req.user.role,
    createProductDto,
  );
}

@Get('my-products')
@UseGuards(AuthGuard('jwt'))
getMyProducts(@Req() req: RequestWithUser) {
  return this.productsService.getProductsBySeller(
    req.user.id,
    req.user.role,
  );
}

@Patch(':id')
@UseGuards(AuthGuard('jwt'))
updateProductBySeller(
  @Param('id', ParseIntPipe) id: number,
  @Req() req: RequestWithUser,
  @Body() updateProductDto: UpdateProductDto,
) {
  return this.productsService.updateProductBySeller(
    id,
    req.user.id,
    req.user.role,
    updateProductDto,
  );
}



  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('searchInput')
   searchProducts(
    @Query('searchTerm') searchTerm: string,
    @Query('page') page = 1,
    @Query('limit') limit = 14,
  ) {

     const cleanedSearchTerm = searchTerm?.trim();

  if (!cleanedSearchTerm) {
    return {
      data: [],
      page: Number(page),
      limit: Number(limit),
      total: 0,
    };
  }
    return this.productsService.searchProducts(
      cleanedSearchTerm,
      Number(page),
      Number(limit),
    );
  }

    @Get('by-category')
  async findByCategory(
    @Query('category') category: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const normalizedCategory = category?.trim().toUpperCase();

    if (!normalizedCategory) {
      return {
        data: [],
        page: Number(page),
        limit: Number(limit),
        total: 0,
      };
    }

    return this.productsService.findByCategory(
      normalizedCategory,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }
}
