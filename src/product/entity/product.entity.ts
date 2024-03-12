import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Collection } from "src/collection/entities/collection.entity";
@Entity({name:"product"})
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

    @Column()
    price:number

    @Column()
    des:string

    @ManyToOne(() => Collection, collection => collection.products)
    collection: Collection;
}