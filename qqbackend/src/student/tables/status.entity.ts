import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { ProgramEntity } from "./program.entity";
import { QuestionCqSSCEntity } from "./question_cq_ssc.entity";
import { ExamSSCEntity } from "./exam_ssc.entity";
import { TeacherEntity } from "src/teacher/tables/teacher.entity";

@Entity('status')
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    // One status can be associated with many students
    @OneToMany(() => StudentEntity, student => student.status)
    students: StudentEntity[];

     // One status can be associated with many students
     @OneToMany(() => TeacherEntity, teacher => teacher.status)
     teachers: TeacherEntity[];

    // One status can be associated with many programs
    @OneToMany(() => ProgramEntity, program => program.status)
    programs: ProgramEntity[];

    // One status can be associated with many questions
    @OneToMany(() => QuestionCqSSCEntity, question => question.status)
    questions_cq: QuestionCqSSCEntity[];

    // One status can be associated with many exams
    @OneToMany(() => ExamSSCEntity, examSSC => examSSC.status)
    examsSSC: ExamSSCEntity[];
}