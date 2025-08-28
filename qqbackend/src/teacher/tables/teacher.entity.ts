import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Status } from './status.entity';
//import { Course } from './course.entity';
//import { StatusEntity } from './status.entity';
//import { ProgramEntity } from './program.entity';


@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  fullname: string;

  @Column({type: 'varchar', length: 200, unique: true,nullable: true })
  email: string;

  @Column( { type: 'varchar', length: 15, unique: true })
  phone_number: string;

  @Column()
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  display_picture: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => Status, status => status.teachers)
  @JoinColumn({ name : 'status_id' })
  status: Status;

  //  @ManyToMany(() => Course, course => course.teachers)
  // courses: Course[];
 }