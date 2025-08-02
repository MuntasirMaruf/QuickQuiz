import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  fullname: string;

  @Column({type: 'varchar', length: 100})
  email: string;

  @Column( { type: 'bigint', unsigned: true })
  phone_number: bigint;

  @Column()
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  display_picture: string;

  // Status: 1 (Valid), 2(Invalid), 3(Deleted)
  @Column({ type: 'int', default: 1 })
  status: number;

  @Column()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}