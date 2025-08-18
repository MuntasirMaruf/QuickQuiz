import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusEntity } from "./status.entity";
import { ExamSSCEntity } from "./exam_ssc.entity";
import { ExamQuestionSSCEntity } from "./exam_question_ssc.entity";

@Entity("questions_cq_ssc")
export class QuestionCqSSCEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    subject: string;

    @Column({ type: 'varchar', length: 100 })
    chapter: string;

    @Column({ type: 'varchar', length: 500 })
    senario: string;

    @Column({ type: 'varchar', length: 200 })
    question_1: string;
    @Column({ type: 'int' })
    marks_q1: number;

    @Column({ type: 'varchar', length: 200 })
    question_2: string;
    @Column({ type: 'int' })
    marks_q2: number;

    @Column({ type: 'varchar', length: 200 })
    question_3: string;
    @Column({ type: 'int' })
    marks_q3: number;

    @Column({ type: 'varchar', length: 200 })
    question_4: string;
    @Column({ type: 'int' })
    marks_q4: number;

    @Column({ type: 'int' })
    marks_total: number;

    @Column({ type: 'varchar', length: 200 })
    exam_name: string;

    @Column({ type: 'varchar', length: 200 })
    institution: string;
    
    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // Many Questions can have one status
    @ManyToOne(() => StatusEntity, status => status.questions_cq, { cascade: false })
    @JoinColumn({ name: 'status_id' })
    status: StatusEntity;

    // One Question can be part of many ExamQuestion junctions
    @OneToMany(() => ExamQuestionSSCEntity, examQuestion => examQuestion.question_cq_ssc)
    examQuestions: ExamQuestionSSCEntity[];

}