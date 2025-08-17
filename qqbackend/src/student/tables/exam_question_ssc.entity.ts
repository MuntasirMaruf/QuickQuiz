import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamSSCEntity } from "./exam_ssc.entity";
import { QuestionCqSSCEntity } from "./question_cq_ssc.entity";

@Entity("exam_questions_ssc")
export class ExamQuestionSSCEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // Many ExamQuestions can belong to one Exam
    @ManyToOne(() => ExamSSCEntity, exam_ssc => exam_ssc.examQuestions)
    @JoinColumn({ name: 'exam_id' })
    exam_ssc: ExamSSCEntity;

    // Many ExamQuestions can belong to one Question
    @ManyToOne(() => QuestionCqSSCEntity, question_cq_ssc => question_cq_ssc.examQuestions)
    @JoinColumn({ name: 'question_id_cq' })
    question_cq_ssc: QuestionCqSSCEntity;

    @Column()
    position: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}