import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Store } from 'src/entities/store.entity';
import { StoreInput, StoreUpdateInput } from './store.input';
import { StoreService } from './store.service';
import graphqlTypeJson from 'graphql-type-json'
import { AuthService } from 'src/auth/auth.service';
import { forwardRef, Inject } from '@nestjs/common';

@Resolver()
export class StoreResolver {
    constructor(private readonly storeService: StoreService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService) {}

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


    @Mutation(() => graphqlTypeJson)
    async storeLogin(@Args({name: 'store_name', type: () => String}) store_name: string, @Args({name: 'password', type: () => String}) pwd: string) {
        if(await this.authService.validateStore(store_name, pwd))
            return await this.authService.storeLogin(store_name, pwd);
        else 
            throw new Error('check store name or password');
    }    
}
