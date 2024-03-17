import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      
    ) {}

    async findOne(username:string){
        return  await this.userRepository.findOne({where:{username}})
    }

    async createUser(createUserDto:CreateUserDto){

        return{status:"success",item:await this.userRepository.save(createUserDto)
        }


    }




}
