import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity('cart')
@ObjectType()
export class Cart {
    @PrimaryGeneratedColumn()
    @Field()
    cart_number?: number;

    @ManyToOne(type => User, user => user.cart_list, {nullable: false})
    @Field(() => User)
    user_id: User;

    @ManyToOne(type => Item, item => item.cart_list, {nullable: false})
    @Field(() => User)
    item_number: Item;

    @Column({ nullable: false})
    @Field(() => Int, {nullable: false})
    cart_count: number;
}
