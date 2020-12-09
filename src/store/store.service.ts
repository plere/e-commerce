import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';
import { StoreUpdateInput } from './store.input';

@Injectable()
export class StoreService {
    constructor(@InjectRepository(Store) private readonly storeRepository: Repository<Store>) {}

    async getStore() {
        return await this.storeRepository.find();
    }

    async createStore(data: Store) {
        let existStore = await this.storeRepository.findOne({
            where: [
                {store_name: data.store_name}
            ]
        });

        if(existStore) {
            return false;

        } else {
            let newStore = await this.storeRepository.create(data);
            await this.storeRepository.save(newStore);
            return true;
        }
    }

    async updateStore(id: string, data: StoreUpdateInput): Promise<Boolean> {
        let store = await this.storeRepository.findOne({store_name: id});
        
        for(let key in data) {
            store[key] = data[key];
        }

        await this.storeRepository.save(store);
        return true;
    }

    async findOne(name: string) {
        let store = await this.storeRepository.findOne({store_name: name});
        if(store) {
            return store;
        } else {
            return null;
        }
    }

}
