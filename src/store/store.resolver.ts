import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Store } from 'src/entities/store.entity';
import { StoreInput, StoreUpdateInput } from './store.input';
import { StoreService } from './store.service';

@Resolver()
export class StoreResolver {
    constructor(private readonly storeService: StoreService) {}

    @Query(() => [Store])
    async getStore() {
        return this.storeService.getStore();
    }

    @Mutation(() => Boolean)
    async createStore(@Args({name: 'storeInput', type: () => StoreInput}) input: StoreInput) {
        if(await this.storeService.createStore(input)) {
            return true;
        } else {
            throw new Error('check store name');
        }
    }

    @Mutation(() => Boolean)
    async updateStore(@Args({name: 'store_name', type: () => ID}) id: string, @Args({name: 'updateInfo', type: () => StoreUpdateInput}) updateInfo: StoreUpdateInput) {
        return await this.storeService.updateStore(id, updateInfo);
    }
}
