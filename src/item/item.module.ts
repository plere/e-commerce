import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    StoreModule
  ],  
  providers: [ItemService, ItemResolver],
  exports: [ItemService]
})
export class ItemModule {}
