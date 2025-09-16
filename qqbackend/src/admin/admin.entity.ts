import { TeacherEntity } from "src/teacher/tables/teacher.entity";
import { StudentEntity } from "src/student/tables/student.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admins')
export class AdminEntity {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ type: 'varchar', length: 100, unique: true })
      username: string;
    
      @Column({ type: 'varchar', length: 150, nullable: true })
      fullname: string;
    
      @Column({ type: 'varchar', length: 200, unique: true })
      email: string;
    
      @Column({ type: 'varchar', length: 15, unique: true })
      phone_number: string;
    
      @Column({ type: 'date', nullable: true })
      date_of_birth: Date;
    
      @Column({ type: 'varchar', length: 20 })
      gender: string;
    
      @Column({ type: 'varchar', length: 300, nullable: true })
      address: string;
    
      @Column({ type: 'varchar', length: 300 })
      password: string;
    
      @Column({ type: 'varchar', length: 200, nullable: true })
      display_picture: string;
    
      @CreateDateColumn({ type: 'timestamp' })
      created_at: Date;
    
      @UpdateDateColumn({ type: 'timestamp' })
      updated_at: Date;
    
      @Column({ type: 'boolean', default: true })
      is_active: boolean;

    @OneToMany(() => TeacherEntity, teacher => teacher.admin, { cascade: true })
    teachers: TeacherEntity[];

    @OneToMany(() => StudentEntity, student => student.admin, { cascade: true })
    students: StudentEntity[];


}