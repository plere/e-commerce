import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Store } from './store.entity';

@Entity()
@ObjectType()
export class Item {
    @PrimaryGeneratedColumn()
    @Field()
    item_number?: string;

    @Column({nullable: false})
    @Field()
    item_name: string;

    @ManyToOne(type => Order, order => order.order_number)
    @Field(() => Order, {nullable: true})
    order_list?: Order[];

    @Column({ nullable: false })
    @Field(() => Int)
    stock_count: number;

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
