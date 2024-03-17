import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor (private readonly userService:UserService, private jwtService:JwtService ){}



    async createHash(password){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }
    
    async login(username:string,password:string){

        const findUser = await this.userService.findOne(username);
        if(findUser && await bcrypt.compare(password,(await findUser).password)){
            const {password,...user} = findUser
            return {
                access_token: await this.jwtService.signAsync({sub:findUser.id,username:findUser.username}),
              };
        }

    }

    async register (registerDto:RegisterDto){
        const findUser = await this.userService.findOne(registerDto.username);
        if(findUser) {
            throw new ConflictException('Username already exists');
        }
        const createdUser = await this.userService.createUser(registerDto)

        
    }





}
