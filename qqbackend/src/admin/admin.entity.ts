import { TeacherEntity } from "src/teacher/teacher.entity";
import { StudentEntity } from "src/student/student.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class AdminEntity{
    @PrimaryGeneratedColumn({name:'ID'})
         id:number;
         @Column({name:'Name'})
         name:string;
         @Column({name:'UserName'})
         uname:string;
         @Column({name:'Password'})
         pass:string;
         @Column({name:'Address'})
         add:string;
         @Column({name:'profile_pic'})
         photo:string;
         
        @OneToMany(()=>TeacherEntity,teacher=>teacher.admin,{cascade:true}) teachers:TeacherEntity[];
        @OneToMany(()=>StudentEntity,student=>student.admin,{cascade:true}) students:StudentEntity[];


}