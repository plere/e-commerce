import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity("store")
@ObjectType()
export class Store {
    @PrimaryColumn()
    @Field(() => ID)
    store_name: string;    

    @Column({ nullable: false })
    @Field()
    password: string;

    @OneToMany(type => Item, item => item.store_id, {cascade: ["insert", "update"]})
    @Field(() => Item)
    item_list?: Item[]
    
    @Column({ nullable: true })
    @Field({ nullable: true })
    store_description?: string;
}
