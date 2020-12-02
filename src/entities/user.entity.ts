import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  address: string;
  
  @Column({ nullable: false, unique: true })
  phoneNumber: number;
}
