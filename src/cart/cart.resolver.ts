import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ItemService } from '@src/item/item.service';
import { CartInput } from './cart.input';
import { CartService } from './cart.service';

@Resolver()
export class CartResolver {
    constructor(private readonly cartService: CartService,
        private readonly itemService: ItemService) {}
    
    //비 로그인 장바구니
    @Mutation(() => Boolean)
    async setCartNonLogin(@Args({name: 'cartInput', type: () => CartInput}) input: CartInput,     
    @Context() context) {
        let cartList: CartInput[] = [];        

        if(context.req.cookies.cart){
            cartList = context.req.cookies.cart;
        }

        let item = await this.itemService.findOne(input.item_number);
        if(item) {
            let currentItemCount = item.stock_count - item.item_order_count;
            if(currentItemCount < input.cart_count) {
                input.cart_count = currentItemCount;
            }

            cartList = cartList.filter(item => item.item_number != input.item_number);
            cartList.push(input);
        
            context.res.cookie('cart', cartList);
        } else {
            return false;
        }
        
        return true;
    }
}
