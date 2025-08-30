import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { TeacherEntity } from "./teacher.entity";


@Entity('status')
export class Status {
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

    @OneToMany(()=> TeacherEntity, teacher => teacher.status)
    teachers: TeacherEntity[];
}