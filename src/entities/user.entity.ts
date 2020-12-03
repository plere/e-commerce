import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
