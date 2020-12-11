import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, SHIPPING_STATUS_ENUM } from 'src/entities/order.entity';
import { ItemService } from 'src/item/item.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService, private readonly itemService: ItemService) {}

    async createOrder(item_number: number, order_count: number, user_id: string) {
        if(order_count < 1)
            throw new Error('check order count');
        try {            
            let user = await this.userService.findOne(user_id);
            let item = await this.itemService.findOne(item_number);
            
            if(item.stock_count - item.item_order_count >= order_count) {
                let newOrder: Order = {
                    user_id: user,
                    item_id: item,
                    order_date: new Date(),
                    shipping_status: SHIPPING_STATUS_ENUM.ORDER_OK
                };
                newOrder = await this.orderRepository.create(newOrder);
                await this.orderRepository.save(newOrder);

                item.item_order_count += order_count;
                await this.itemService.save(item);

                return true;
            } else {
                throw new Error('check stock count');
            }
        } catch (err) {
            throw err;
        }
    }
}
