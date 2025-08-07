import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { ProgramEntity } from "./program.entity";

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
    @OneToMany(() => ProgramEntity, program => program.status)
    programs: ProgramEntity[];
}