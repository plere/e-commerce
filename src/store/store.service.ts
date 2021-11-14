import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreUpdateInput } from './store.input';
import { Store } from '@src/entities/store.entity';

@Injectable()
export class StoreService {
    constructor(@InjectRepository(Store) private readonly storeRepository: Repository<Store>) {}

    async getStore() {
        return await this.storeRepository.find();
    }

    async createStore(data: Store) {
        //schema 유효한지 검사
        let existStore = await this.storeRepository.findOne({
            where: [
                {store_name: data.store_name},
                {store_email: data.store_email},
                {store_tel: data.store_tel}
            ]
        });

        if(existStore) {
            return null;

        } else {
            let newStore = await this.storeRepository.create(data);
            await this.storeRepository.save(newStore);
            return newStore;
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

    async remove(id: string, pwd: string) {
        let store = await this.storeRepository.findOne({store_name: id, password: pwd});
        if(store) {
            await this.storeRepository.delete(store);
            return true;
        } else {
            return false;
        }
    }

}
