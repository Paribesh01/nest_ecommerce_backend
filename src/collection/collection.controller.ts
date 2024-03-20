import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Request } from 'express';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto,  @Req() request: any) {
    return this.collectionService.create(createCollectionDto, request);
  }
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
