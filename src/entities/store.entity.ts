import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Store {
    @PrimaryColumn()
    store_name: string;    

    @Column({ nullable: false })
    password: string;

    @ManyToOne(type => Item, item => item.item_number)
    item_list?: Item[]
    
    @Column({ nullable: true })
    store_description?: string;
}
