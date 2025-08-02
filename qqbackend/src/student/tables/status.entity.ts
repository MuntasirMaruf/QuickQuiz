import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('status')
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 })
    name: string;
}