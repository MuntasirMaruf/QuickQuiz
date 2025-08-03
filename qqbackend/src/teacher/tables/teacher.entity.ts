import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('teacher')
export class Teacher {
  @PrimaryColumn({type:'int', unsigned: true })
  id: number;

  @Column({ type:'varchar',length: 100 })
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column({ nullable: true })
  email: string;

  @Column( { type: 'bigint', unsigned: true })
  phoneNumber: bigint;

  @Column({ type: 'varchar', length: 20 })
  password: string;
  
  @Column({nullable: true})
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @Column({ type: 'varchar', default: 'active'})
  status: string;

  @Column({nullable: true})
  document: string;
}