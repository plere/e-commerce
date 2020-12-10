import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Store } from 'src/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Store])
  ],  
  providers: [ItemService, ItemResolver]
})
export class ItemModule {}
