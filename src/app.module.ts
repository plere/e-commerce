import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { DateScalar } from './scalarType/custom.scalar';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
    }),
    TypeOrmModule.forRoot(),
    PassportModule,
    UserModule,
    StoreModule,
    AuthModule,
    ItemModule
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
