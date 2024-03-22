import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @ManyToOne(() => User, user => user.collection)
    user: User;


}
