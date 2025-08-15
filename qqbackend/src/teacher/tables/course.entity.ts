// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Teacher } from './teacher.entity'; // import the Teacher entity

// @Entity('course')
// export class Course {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 100 })
//   course_name: string;

//   @ManyToOne(() => Teacher, (teacher) => teacher.courses)
//   teacher: Teacher;  // Establishing the one-to-many relationship
// }
