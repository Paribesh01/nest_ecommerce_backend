import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"cart"})
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=>User,user=>user.cart)
    user :User;
    
    @OneToMany(()=>Product,product=>product.cart)
    products:Product[]





}
