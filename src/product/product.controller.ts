import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Public } from 'src/common/decorator/public-decorator';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Post(":id") 
    createProduct(@Param("id") collectionId: number,@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(collectionId,createProductDto);
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
