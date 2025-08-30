import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert, ManyToMany, OneToOne, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { StatusEntity } from "./status.entity";
import { ProgramEntity } from "./program.entity";
import { AdminEntity } from "src/admin/admin.entity";
@Entity('students')
export class StudentEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  fullname: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phone_number: string;

  @Column()
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

  @BeforeInsert()
  setDefaultValues() {
    const age = this.calculateAge(this.date_of_birth);
    const middle = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    this.id = parseInt(`${middle}0${age}`);

    this.created_at = this.created_at || new Date();
  }

  // Many students can have one status
  @ManyToOne(() => StatusEntity, status => status.students)
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  // Many students can have one program
  @ManyToOne(() => ProgramEntity, program => program.students)
  @JoinColumn({ name: 'program_id' })
  program: ProgramEntity;

  @ManyToOne(() => AdminEntity, admin => admin.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' }) // optional
  admin: AdminEntity;


  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
