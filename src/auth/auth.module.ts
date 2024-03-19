import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from './auth.gurd';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    UserModule, // Assuming UserModule provides UserRepository
    JwtModule.register({
      global: true,
      secret: "this_is_the_secret",
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    
  ],
  controllers: [AuthController]
})
export class AuthModule {}
