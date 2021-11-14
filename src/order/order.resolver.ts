import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Int, Mutation, Resolver } from '@nestjs/graphql';
import { JwtGraphQLAuthGuard } from '@src/auth/jwt-auth.guard';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(JwtGraphQLAuthGuard)
    @Mutation(() => Boolean)
    async createOrder(@Args({name: 'item_number', type: () => ID}) item_number: number,
    @Args({name: 'order_count', type: () => Int}) order_count: number, @Context() ctx) {
        if(!ctx.req.user.isStore)
            return await this.orderService.createOrder(item_number, order_count, ctx.req.user.id);
        else
            throw new Error('you are not User');
    }
}
