import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Store {
    @PrimaryColumn()
    store_id: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(type => Item, item => item.item_number)
    item_list?: Item[]
    
    @Column()
    store_description?: string;
}
