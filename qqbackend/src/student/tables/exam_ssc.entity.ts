import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionCqSSCEntity } from "./question_cq_ssc.entity";
import { StatusEntity } from "./status.entity";
import { ExamQuestionSSCEntity } from "./exam_question_ssc.entity";

@Entity("exams_ssc")
export class ExamSSCEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    category: string;

    @Column({ type: 'varchar', length: 100 })
    subject: string;

    @Column()
    marks: number;

    @Column()
    duration: number;

    @Column()
    date: Date;

    @Column({ type: 'varchar', length: 100 })
    time: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // Many Exams can have one Status
    @ManyToOne(() => StatusEntity, status => status.examsSSC)
    @JoinColumn({ name: 'status_id' })
    status: StatusEntity;

    @OneToMany(() => ExamQuestionSSCEntity, examQuestion => examQuestion.exam_ssc)
    examQuestions: ExamQuestionSSCEntity[];
}
