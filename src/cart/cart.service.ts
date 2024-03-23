import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Request } from 'express';
import { Product } from 'src/product/entity/product.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    // private readonly productService:ProductService
  ) {}



  async addProduct(productId: number, request: Request) {
    try {
      // Find the user associated with the request
      const user = await this.userRepository.findOne({ where: { username: request["user"].username }, relations: ['cart'] });
      
      // If user doesn't have a cart, create one
      if (!user.cart) {
        const cart = new Cart();
        cart.user = user;
        user.cart = await this.cartRepository.save(cart);
        await this.userRepository.save(user);
      }
      
      // Find the product to add to the cart
      const productToAdd = await this.productRepository.findOne({where:{id:productId}});
      // const productToAdd = await this.productService.findPro(productId)
      if(!productToAdd){

        console.log(productId)
        throw new Error("Product not found");
      }
      // Find the cart associated with the user
      const cart = await this.cartRepository.findOne({ where: { id: user.cart.id }, relations: ['products'] });

      // Add the product to the cart
      cart.products.push(productToAdd);

      // Save the updated cart
      await this.cartRepository.save(cart);

      // Return the updated cart
      return { cart };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add product to cart');
    }
  

  }

  async showCart(request: Request) {
    try {
      // Find the user associated with the request
      const user = await this.userRepository.findOne({ where: { username: request["user"].username }, relations: ['cart'] });
      
      // If user doesn't have a cart, return an empty array or handle it according to your business logic
      if (!user.cart) {
        return [];
      }

      // Find the cart associated with the user
      const cart = await this.cartRepository.findOne({ where: { id: user.cart.id }, relations: ['products'] });

      return cart.products;
    } catch (error) {
      throw new Error('Failed to retrieve cart');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(id: number,request:Request) {

    const productToDelete = await this.productRepository.find({where:{id}})
    const user = await this.userRepository.findOne({ where: { username: request["user"].username }, relations: ['cart'] });
    const cart = await this.cartRepository.findOne({ where: { id: user.cart.id }, relations: ['products'] });

    const index = cart.products.findIndex(product => product.id === id);
    if (index !== -1) {
        // Remove the product from the cart
        cart.products.splice(index, 1);
        // Save the updated cart
        await this.cartRepository.save(cart);
        return await this.cartRepository.findOne({ where: { id: user.cart.id }, relations: ['products'] });;
    } else {
        return `Product with ID ${id} not found in the cart`;
    }



    return `This action removes a #${id} cart`;
  }
}
