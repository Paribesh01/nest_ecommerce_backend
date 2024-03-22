import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Request } from 'express'; // Import Request type from express

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Post(":id") 
    createProduct(@Param("id") collectionId: number, @Body() createProductDto: CreateProductDto, @Req() request: Request) {
        return this.productService.createProduct(collectionId, createProductDto, request);
    }

    @Get()
    getAllProduct() {
        return this.productService.findAll();
    }

    @Get(":id")
    getOneProduct(@Param("id") id: number) {
        return this.productService.findOne(id);
    }

    @Patch(":id")
    updateProduct(@Param("id") id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(":id")
    deleteProduct(@Param("id") id: number) {
        return this.productService.deleteProduct(id);
    }
}
