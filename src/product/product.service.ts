import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Request } from 'express'; // Import Request type from express

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

    async findPro(id:number){
      return{product :await this.productRepository.find({where:{id}})}
    }


  async findOne(id: number) {
    try {
      const item = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .leftJoinAndSelect('product.collection', 'collection')
        .where('product.id = :id', { id })
        .getOne();

      if (!item) {
        throw new NotFoundException('Product not found');
      }

      return { status: 'success', item };
    } catch (e) {
      return { status: 'fail', err: e.message };
    }
  }

  async findAll(request:Request) {
    try {
      
      const user = await this.userRepository.findOne({ where: { username: request["user"].username } });

      const items = await this.productRepository.find({
        where: { user: user },
      });
  


      
      return { status: 'success',items };
    } catch (e) {
      return { status: 'fail', err: e.message };
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.productRepository.update(id, updateProductDto);
      const item = await this.productRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException('Product not found');
      }
      return { status: 'success', item };
    } catch (e) {
      return { status: 'fail', err: e.message };
    }
  }

  async deleteProduct(id: number) {
    try {
      const toBeDeleted = await this.productRepository.findOne({
        where: { id },
      });
      if (!toBeDeleted) {
        throw new NotFoundException('Product not found');
      }
      await this.productRepository.delete(id);
      return { status: 'success', item: toBeDeleted };
    } catch (e) {
      return { status: 'fail', err: e.message };
    }
  }

  async createProduct(
    collectionId: number,
    createProductDto: CreateProductDto,
    request: Request,
  ) {
    try {
      if (
        await this.productRepository.findOne({
          where: { name: createProductDto.name },
        })
      ) {
      }
      const collection = await this.collectionRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      const user = await this.userRepository.findOne({
        where: { username: request['user'].username },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const product = this.productRepository.create({
        ...createProductDto,
        user,
        collection,
      });

      await this.productRepository.save(product);
      return { status: 'success', item: product };
    } catch (e) {
      return { status: 'fail', err: e.message };
    }
  }
}
