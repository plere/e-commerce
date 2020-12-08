import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Store } from './store.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    item_number: string;

    @Column({nullable: false})
    item_name: string;

    @ManyToOne(type => Order, order => order.order_number)
    order_list?: Order[];

    @Column({ nullable: false })
    stock_count: number;

    @Column({ nullable: false })
    item_price: number;

    @OneToMany(type => Store, store => store.store_name)
    @JoinColumn()
    store_id: Store
    
    @Column({ nullable: true })
    item_description?: string;
}
