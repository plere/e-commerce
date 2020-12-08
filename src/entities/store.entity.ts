import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
@ObjectType()
export class Store {
    @PrimaryColumn()
    @Field(() => ID)
    store_name: string;    

    @Column({ nullable: false })
    @Field()
    password: string;

    @ManyToOne(type => Item, item => item.item_number)
    @Field(() => Item)
    item_list?: Item[]
    
    @Column({ nullable: true })
    @Field({ nullable: true })
    store_description?: string;
}
