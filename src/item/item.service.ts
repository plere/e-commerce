import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { StoreService } from 'src/store/store.service';
import { Repository } from 'typeorm';
import { ItemInput } from './item.input';

@Injectable()
export class ItemService {
    constructor(@InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly storeService: StoreService) { }

    async createItem(data: ItemInput, store_name: string) {
        let store = await this.storeService.findOne(store_name);
        let newItem: Item = {
            ...data, 
            item_order_count: 0,
            store_id: store
        };

        newItem = await this.itemRepository.create(newItem);
        await this.itemRepository.save(newItem);
                    
        return true;
    }

    async removeItem(item_number: number) {
        return await this.itemRepository.delete(item_number);
    }

    async findOne(item_number: number) {
        return await this.itemRepository.findOne(item_number);
    }

    async save(newItem: Item) {
        return await this.itemRepository.save(newItem);
    }
}