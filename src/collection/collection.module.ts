import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './entities/collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  imports:[UserModule,ProductModule,TypeOrmModule.forFeature([Collection,Product,User])],
  controllers: [CollectionController],
  providers: [CollectionService,UserService,ProductService],
})
export class CollectionModule {}
