import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert } from "typeorm";
@Entity('students')
export class StudentEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  fullname: string;

  @Column({type: 'varchar', length: 100})
  email: string;

  @Column( { type: 'varchar' })
  phone_number: string;

  @Column()
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  display_picture: string;

  // Status: 1 (Valid), 2(Invalid), 3(Deleted)
  @Column({ type: 'int', default: 1 })
  status: number;

  @Column()
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
