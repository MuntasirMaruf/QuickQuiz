import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { StatusEntity } from 'src/student/tables/status.entity';
import { AdminEntity } from 'src/admin/admin.entity';
//import { SubjectEntity } from './subject.entity';


@Entity('teachers')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  fullname: string;

  @Column({ type: 'varchar', length: 200, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
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
   @Column({
    type: 'numeric',
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string | null) => (value !== null ? parseFloat(value) : null),
    },
  })
  salary: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => StatusEntity, status => status.teachers)
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  //  @ManyToMany(() => Course, course => course.teachers)
  // courses: Course[];

  @ManyToOne(() => AdminEntity, admin => admin.teachers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' }) // optional, if you want custom column name
  admin: AdminEntity;
  
// // inside class:
// @ManyToOne(() => SubjectEntity, (subject) => subject.teachers, {
//   nullable: true, onDelete: 'SET NULL',
// })
// @JoinColumn({ name: 'subject_id' })
// subject: SubjectEntity | null;
}
