import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Store } from './store.entity';

@Entity()
@ObjectType()
export class Item {
    @PrimaryGeneratedColumn()
    @Field()
    item_number: string;

    @Column({nullable: false})
    @Field()
    item_name: string;

    @ManyToOne(type => Order, order => order.order_number)
    @Field(() => Order)
    order_list?: Order[];

    @Column({ nullable: false })
    @Field(() => Int)
    stock_count: number;

    @Column({ nullable: false })
    @Field(() => Int)
    item_price: number;

    @OneToMany(type => Store, store => store.store_name)
    @JoinColumn()
    @Field(() => Store)
    store_id: Store
    
    @Column({ nullable: true })
    @Field({ nullable: true })
    item_description?: string;
}
