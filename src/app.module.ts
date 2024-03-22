import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entity/product.entity';
import { CollectionModule } from './collection/collection.module';
import { Collection } from './collection/entities/collection.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthGuard } from './auth/auth.gurd';

@Module({
  imports: [ TypeOrmModule.forRoot({
    autoLoadEntities: true,
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Abi1234@',
    database: 'ecommerce',
    entities: [Product,Collection,User],
    synchronize: true,
  }),ProductModule, CollectionModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:"App_GUARD",
    useClass:AuthGuard
  }],
})
export class AppModule {}
