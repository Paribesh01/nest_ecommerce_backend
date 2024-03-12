import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollectionService {

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository:Repository<Collection>
    )
  {}


  async create(createCollectionDto: CreateCollectionDto) {
    try{
            
      return {status:"success",item: await this.collectionRepository.save(createCollectionDto)}
  }catch(e){
      return {status:"fail",err:e}
  }
  }

  async findAll() {
    try{
      return {status:"success",item: await this.collectionRepository.find()}
  }catch(e){
      return {status:"fail",err:e}
  }
  }

  async findOne(id: number) {
    const queryBuilder: SelectQueryBuilder<Collection> = this.collectionRepository.createQueryBuilder('collection');
    queryBuilder.leftJoinAndSelect('collection.products', 'products')
                .where('collection.id = :id', { id });

    const collection = await queryBuilder.getOne();
    if (!collection) {
      throw new NotFoundException('Collection not found');
    }
    return collection;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
