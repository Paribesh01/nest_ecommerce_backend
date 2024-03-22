
import { Cart } from "src/cart/entities/cart.entity";
import { Collection } from "src/collection/entities/collection.entity";
import { Product } from "src/product/entity/product.entity";
import {  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"user"})
export class User {


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToOne(()=>Cart,cart=>cart.user)
    @JoinColumn()
    cart:Cart

    @OneToMany(() => Collection, collection => collection.user)
    collection: Collection[];
    
    @OneToMany(() => Product, product => product.user)
    products: Product[];




}
