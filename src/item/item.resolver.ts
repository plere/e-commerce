import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ItemInput } from './item.input';
import { ItemService } from './item.service';

@Resolver()
export class ItemResolver {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async createItem(@Args({name: 'ItemInput', type: () => ItemInput}) input: ItemInput, @Context() ctx) {
        return await this.itemService.createItem(input, ctx.req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async removeItem(@Args({name: 'item_number', type: () => ID}) item_number: number) {
        if(await (await this.itemService.removeItem(item_number)).affected > 0)
            return true;
        else
            return false;
    }
}
