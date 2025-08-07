import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { StatusEntity } from "./status.entity";
import { StudentEntity } from "./student.entity";

@Entity('programs')
export class ProgramEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    description: string;

    @Column()
    duration: number; // Duration in months

    @Column()
    start_date: Date;

    @Column({ nullable: true })
    price: number;

    @Column({ type: 'int', default: 100 })
    capacity: number;

    @Column({ type: 'int', default: 0 })
    student_count: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    // Many Program can have only one status
    @ManyToOne(() => StatusEntity, status => status.programs)
    @JoinColumn({ name: 'status_id' })
    status: StatusEntity;

    // One Program can have many students
    @OneToMany(() => StudentEntity, student => student.program)
    students: StudentEntity[];
}