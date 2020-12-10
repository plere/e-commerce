import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
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
}
