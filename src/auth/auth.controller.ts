import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/common/decorator/public-decorator';

@Controller('auth')
export class AuthController {

constructor(private readonly authService:AuthService){}
    @Public()
    @Post("login")
    logIn(@Body()loginDto:LoginDto){
        return this.authService.login(loginDto.username,loginDto.password)
    }
    @Public()
    @Post("register")
    register(@Body()registerDto:RegisterDto){
        return this.authService.register(registerDto)
    }



}
