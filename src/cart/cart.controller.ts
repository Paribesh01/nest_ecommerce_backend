import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(":id")
  create(@Param("id")id:number,@Req() request:Request) {
    return this.cartService.addProduct(id,request);
  }

  @Get()
  findAll(@Req()request:Request) {
    return this.cartService.showCart(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req()request:Request) {
    return this.cartService.remove(+id,request);
  }
}
