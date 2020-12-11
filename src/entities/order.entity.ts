import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

export enum SHIPPING_STATUS_ENUM {
    ORDER_OK = 'ORDER_OK',
    SHIPPING_READY = 'SHIPPING_READY',
    SHIPPING_START = 'SHIPPING_START',
    SHIPPING_COMPLETE = 'SHIPPING_COMPLETE'
}

registerEnumType(SHIPPING_STATUS_ENUM, {
    name: 'SHIPPING_STATUS_ENUM',
  });  

@Entity()
@ObjectType()
export class Order {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    order_number: string;

    @OneToMany(type => User, user => user.id)
    @Field(() => User)
    user_id: User;

    @OneToMany(type => Item, item => item.item_number)
    @Field(() => Item)
    item_id: Item;

    @Column({type: 'date'})
    @Field(() => Date)
    order_date: Date;

    @Column('text', {default: SHIPPING_STATUS_ENUM.ORDER_OK})
    @Field(() => SHIPPING_STATUS_ENUM)
    shipping_status: SHIPPING_STATUS_ENUM;
}

