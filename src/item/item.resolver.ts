import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JwtGraphQLAuthGuard } from '@src/auth/jwt-auth.guard';
import { ItemInput } from './item.input';
import { ItemService } from './item.service';

@Resolver()
export class ItemResolver {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(JwtGraphQLAuthGuard)
    @Mutation(() => Boolean)
    async createItem(@Args({name: 'ItemInput', type: () => ItemInput}) input: ItemInput, @Context() ctx) {        
        if(ctx.req.user.isStore)
            return await this.itemService.createItem(input, ctx.req.user.id);
        else
            throw new Error('You are not Store');
    }

    @UseGuards(JwtGraphQLAuthGuard)
    @Mutation(() => Boolean)
    async removeItem(@Args({name: 'item_number', type: () => ID}) item_number: number, @Context() ctx) {
        if(ctx.req.user.isStore) {
            if(await (await this.itemService.removeItem(item_number)).affected > 0)
                return true;
            else
                return false;
        } else {
            throw new Error('You are not Store');
        }        
    }
}
