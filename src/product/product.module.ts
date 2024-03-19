import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.gurd';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Collection])],
  controllers: [ProductController],
  providers: [ProductService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },]
})
export class ProductModule {}
