import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';
import { ItemInput } from './item.input';

@Injectable()
export class ItemService {
    constructor(@InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Store) private readonly storeRepository: Repository<Store>) { }

    async createItem(data: ItemInput, store_name: string) {
        let store = await this.storeRepository.findOne(store_name);
        let newItem: Item = {...data, store_id: store};

        newItem = await this.itemRepository.create(newItem);
        newItem = await this.itemRepository.save(newItem);
                    
        return true;
    }

    async removeItem(item_number: number) {
        return await this.itemRepository.delete(item_number);
    }
}
