import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

export enum SHIPPING_STATUS_ENUM {
    ORDER_OK = 'ORDER_OK',
    SHIPPING_READY = 'SHIPPING_READY',
    SHIPPING_START = 'SHIPPING_START',
    SHIPPING_COMPLETE = 'SHIPPING_COMPLETE'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_number: string;

    @OneToMany(type => User, user => user.id)
    @JoinColumn()
    user_id: User;

    @OneToMany(type => Item, item => item.item_number)
    @JoinColumn()
    item_id: Item;

    @Column('text', {default: SHIPPING_STATUS_ENUM.ORDER_OK})
    shipping_status: SHIPPING_STATUS_ENUM;
}

