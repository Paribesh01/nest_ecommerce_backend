
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"collection"})
export class User {


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;




}
