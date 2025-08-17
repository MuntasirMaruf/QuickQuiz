// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
// import { Teacher } from './teacher.entity';

// @Entity('course')
// export class Course {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 100, unique: true })
//   name: string;

//   @Column({ type: 'varchar', length: 200, nullable: true })
//   description: string;

//   @CreateDateColumn({ type: 'timestamp' })
//   created_at: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   updated_at: Date;

//   @ManyToMany(() => Teacher, teacher => teacher.courses)
//   @JoinTable({
//     name: 'teacher_course', // Join table name
//     joinColumn: { name: 'course_id', referencedColumnName: 'id' },
//     inverseJoinColumn: { name: 'teacher_id', referencedColumnName: 'id' },
//   })
//   teachers: Teacher[];
// }