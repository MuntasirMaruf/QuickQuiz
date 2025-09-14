import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("answers_ssc")
export class AnswerSSCEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: true })
    answer_1: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    answer_2: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    answer_3: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    answer_4: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ nullable: true })
    exam_question_id: number;

    @Column({ nullable: true })
    exam_id: number;

    @Column({ nullable: true })
    student_id: number;

    @Column({ nullable: true })
    teacher_id: number;
}