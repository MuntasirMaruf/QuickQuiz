import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  address?: string;

  @Column()
  password: string;

  @Column()
  displayPicture: string;

  @Column()
  status: number;
}