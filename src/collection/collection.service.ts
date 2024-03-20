import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto, request: Request) {
    try {
      const user = await this.userRepository.findOne({ where: { username: request["user"].username } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const collection = this.collectionRepository.create({
        ...createCollectionDto,
        user,
      });

      await this.collectionRepository.save(collection);

      return collection;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create collection',); // Or handle specific error cases
    }
  }

  async findAll() {
    try {
      const collectionsWithUsers = await this.collectionRepository.createQueryBuilder('collection')
        .leftJoinAndSelect('collection.user', 'user')
        .getMany();

      return collectionsWithUsers;
    } catch (error) {
      console.error('Failed to fetch collections with users:', error);
      throw new Error('Failed to fetch collections with users');
    }
  }

  async findOne(id: number) {
    try {
      const queryBuilder: SelectQueryBuilder<Collection> = this.collectionRepository.createQueryBuilder('collection');
      queryBuilder.leftJoinAndSelect('collection.products', 'products')
                  .where('collection.id = :id', { id });

      const collection = await queryBuilder.getOne();
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      return collection;
    } catch (error) {
      throw new Error('Failed to fetch collection');
    }
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
