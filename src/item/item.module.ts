import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '@src/entities/item.entity';
import { StoreModule } from '@src/store/store.module';
import { ItemController } from './item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    StoreModule
  ],  
  providers: [ItemService, ItemResolver],
  exports: [ItemService],
  controllers: [ItemController]
})
export class ItemModule {}
