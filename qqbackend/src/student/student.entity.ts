import { AdminEntity } from "src/admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('Student')
export class StudentEntity{
    @PrimaryGeneratedColumn({name:'Id'})
    id:number;
    @Column({name:'Name'})
    name:string;
    @Column({name:'Email'})
    email:string;
    @Column({name:'CGPA',type: 'decimal',precision: 3, scale: 2, default: 0})
    cgpa:number;
    @ManyToOne(() => AdminEntity, admin => admin.students, { onDelete: 'CASCADE' })
    admin: AdminEntity;
}