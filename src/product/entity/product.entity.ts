import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Collection } from "src/collection/entities/collection.entity";
import { User } from "src/user/entities/user.entity";
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


    @ManyToOne(() => User, user => user.products)
    user: Product;
    
    @ManyToOne(() => Collection, collection => collection.products)
    collection: Collection;
}