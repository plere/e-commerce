import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('user')
@ObjectType()
export class User{
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column({ nullable: false })
  @Field({nullable: false})
  password: string;

  @Column({ nullable: false })
  @Field({nullable: false})
  address: string;
  
  @Column({ nullable: false, unique: true })
  @Field(() => Int, {nullable: false})
  phoneNumber: number;

  @OneToMany(type => Order, order => order.user_id, {cascade: ["insert", "update"]})
  @Field(() => Order)
  order_list?: Order[]
}
