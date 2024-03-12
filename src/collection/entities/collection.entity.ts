import { Product } from "src/product/entity/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"collection"})
export class Collection {


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    des:string;

    @OneToMany(() => Product, product => product.collection)
    products: Product[];




}
