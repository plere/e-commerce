import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
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

  @ManyToOne(type => Order, order => order.order_number)
  @Field(() => Order)
  order_list?: Order[]
}
