import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Store } from './store.entity';

@Entity('item')
@ObjectType()
export class Item {
    @PrimaryGeneratedColumn()
    @Field()
    item_number?: number;

    @Column({nullable: false})
    @Field()
    item_name: string;

    @OneToMany(type => Order, order => order.item_id, {cascade: ["insert", "update"]})
    @Field(() => Order, {nullable: true})
    order_list?: Order[];

    @Column({ nullable: false })
    @Field(() => Int)
    stock_count: number;

    @Column({ nullable: false, default: 0 })
    @Field(() => Int, {defaultValue: 0})
    item_order_count: number;

    @Column({ nullable: false })
    @Field(() => Int)
    item_price: number;

    @ManyToOne(type => Store, store => store.item_list, {nullable: false})
    @Field(() => Store)
    store_id?: Store
    
    @Column({ nullable: true })
    @Field({ nullable: true })
    item_description?: string;
}
