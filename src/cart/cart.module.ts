import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product,User,Cart])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
