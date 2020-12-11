import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [
    ItemModule,
    UserModule,
    TypeOrmModule.forFeature([Order])
  ],
  providers: [OrderService, OrderResolver]
})
export class OrderModule {}
