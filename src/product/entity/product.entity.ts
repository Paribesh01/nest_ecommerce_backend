import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Collection } from "src/collection/entities/collection.entity";
import { User } from "src/user/entities/user.entity";
import { Cart } from "src/cart/entities/cart.entity";
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
    user: User;
    
    @ManyToOne(() => Collection, collection => collection.products)
    collection: Collection;

    @ManyToOne(() => Cart, cart => cart.products)
    cart: Cart;
}