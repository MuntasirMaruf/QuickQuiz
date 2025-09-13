// import {
//   Entity, PrimaryGeneratedColumn, Column,
//   CreateDateColumn, UpdateDateColumn,
//   OneToMany
// } from 'typeorm';
// import { TeacherEntity } from 'src/teacher/teacher.entity';

// @Entity('subjects')
// export class SubjectEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 120, unique: true })
//   code: string;

//   @Column({ type: 'varchar', length: 200 })
//   name: string;

//   @Column({ type: 'text', nullable: true })
//   description?: string;

//   @Column({ type: 'boolean', default: true })
//   is_active: boolean;

//   @CreateDateColumn({ type: 'timestamp' })
//   created_at: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   updated_at: Date;

//   @OneToMany(() => TeacherEntity, (teacher) => teacher.subject)
//   teachers: TeacherEntity[];
// }
