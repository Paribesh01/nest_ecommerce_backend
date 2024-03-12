import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Collection)
        private readonly collectionRepository: Repository<Collection>,
    ) {}

    async findOne(id: number) {
        try {
            const item = await this.productRepository.findOne({where:{id}});
            if (!item) {
                throw new NotFoundException('Product not found');
            }
            return { status: 'success', item };
        } catch (e) {
            return { status: 'fail', err: e.message };
        }
    }

    async findAll() {
        try {
            const items = await this.productRepository.find();
            return { status: 'success', items };
        } catch (e) {
            return { status: 'fail', err: e.message };
        }
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto) {
        try {
            await this.productRepository.update(id, updateProductDto);
            const item = await this.productRepository.findOne({where:{id}});
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
            const toBeDeleted = await this.productRepository.findOne({where:{id}});
            if (!toBeDeleted) {
                throw new NotFoundException('Product not found');
            }
            await this.productRepository.delete(id);
            return { status: 'success', item: toBeDeleted };
        } catch (e) {
            return { status: 'fail', err: e.message };
        }
    }

    async createProduct(collectionId: number, createProductDto: CreateProductDto) {
        try {
            const collection = await this.collectionRepository.findOne({where:{id:collectionId}});
            if (!collection) {
                throw new NotFoundException('Collection not found');
            }
            const product = this.productRepository.create({
                ...createProductDto,
                collection,
            });
            
            await this.productRepository.save(product);
            return { status: 'success', item: product };
        } catch (e) {
            return { status: 'fail', err: e.message };
        }
    }
}
