import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { ItemModule } from '@src/item/item.module';

@Module({
  imports: [
    ItemModule
  ],
  providers: [CartService, CartResolver]
})
export class CartModule {}
