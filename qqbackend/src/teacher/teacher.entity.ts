import { AdminEntity } from "src/admin/admin.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('Teacher')
export class TeacherEntity{
    @PrimaryGeneratedColumn({name:'Id'})
    id:number;
    @Column({name:'Name'})
    name:string;
    @Column({name:'Email'})
    email:string;
    @ManyToOne(() => AdminEntity, admin => admin.teachers, { onDelete: 'CASCADE' })
    admin: AdminEntity;


    
}
 