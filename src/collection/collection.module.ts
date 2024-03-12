import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './entities/collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Collection,Product])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
