import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { StudentDto } from "./dtos/student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Not, Repository } from "typeorm";
import { StudentEntity } from "./tables/student.entity";
import { StatusEntity } from "./tables/status.entity";
import { ProgramEntity } from "./tables/program.entity";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>,
        @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
        @InjectRepository(ProgramEntity) private readonly programRepository: Repository<ProgramEntity>,
        private readonly mailerService: MailerService
    ) {}

    async register(dto: StudentDto): Promise<StudentEntity | string> {
        const status = await this.statusRepository.findOneBy({ id: 1 }); // Assuming id 1 is 'Valid'
        if (!status) {
          throw new NotFoundException("Status 'Valid' not found.");
        }
    
        const program = await this.programRepository.findOneBy({ id: 1 });
        if (!program) {
          throw new NotFoundException("Program not found.");
        }
    
        const existingStudent = await this.studentRepository.find({
          where: [
            { id: dto.id },
            { username: dto.username },
            { email: dto.email },
            { phone_number: dto.phone_number }
          ]
        });
    
        if (existingStudent.length > 0) {
          throw new BadRequestException(
            'Student with this username/email/number already exists.'
          );
        }
    
        const student = this.studentRepository.create(dto);
        student.is_active = true;
        student.status = status;
        student.program = program;
    
        const saltRounds = 10;
        const hashed = await bcrypt.hash(dto.password, saltRounds);
        if (!hashed) {
          throw new InternalServerErrorException('Error hashing password.');
        }
        student.password = hashed;
    
        const registered_student = await this.studentRepository.save(student);
        this.sendWelcomeEmail(registered_student.email, registered_student.fullname, registered_student.id.toString());
        return "Student registered successfully.";
      }

    async viewPersonalInfo(id: number): Promise<StudentEntity | null> {
        return this.studentRepository.findOne({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'password', 'is_active'], relations: ['status', 'program'], 
            where: { id: id },
        });
    }

    async update(id: number, dto: StudentDto): Promise<StudentEntity | null> {
        const student = this.studentRepository.create(dto);
        const existingStudent = await this.studentRepository.findOneBy({ id: id });
        if (!existingStudent) {
            throw new NotFoundException("Student not found.");
        }

        const duplicateStudent = await this.studentRepository.find({
            where: [
              { id: Not(id), username: dto.username },
              { id: Not(id), email: dto.email },
              { id: Not(id), phone_number: dto.phone_number }
            ]
          });
        if (duplicateStudent.length > 0) {
            throw new BadRequestException('Username/email/number already exists.');
        }

        const saltRounds = 10;
        const hashed = await bcrypt.hash(dto.password, saltRounds);
        if (!hashed) {
          throw new InternalServerErrorException('Error hashing password.');
        }

        const fieldsToUpdate = {
            username: dto.username,
            fullname: dto.fullname,
            email: dto.email,
            phone_number: dto.phone_number,
            date_of_birth: dto.date_of_birth,
            gender: dto.gender,
            address: dto.address,
            password: hashed,
        };

        await this.studentRepository.update(id, fieldsToUpdate);
        return this.studentRepository.findOneBy({ id: id });
    }

    async updateDp(id: number, displayPicture: string): Promise<StudentEntity> {
        const student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.display_picture = displayPicture;
            return this.studentRepository.save(student);
        }
        throw new NotFoundException("Student not found.");
    }

    async delete(id: number): Promise<string | void> {
        //await this.studentRepository.delete(id);
        const status = await this.statusRepository.findOneBy({ id: 3 }); // Assuming id 3 is 'Deleted'
        if (!status) {
            throw new NotFoundException("Student not found.");
        }

        let student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.status = status; // Soft delete by setting status to 3 (Deleted)
            await this.studentRepository.update(id, student);
            return "Student deleted successfully.";
        }
        throw new NotFoundException("Student not found.");
    }


    async getAll(): Promise<StudentEntity[]> {
        const students = await this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'], relations: ['status', 'program'], 
        });
        if (students.length > 0) {
            return students;
        }
        throw new NotFoundException("No students found.");
    }

                
    async getValids(): Promise<StudentEntity[]> {
        return this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'], relations: ['status', 'program'],
            where: {status: { id: 1 }}, 
        });
    }

    async getActives(): Promise<StudentEntity[]> {
        const students = await this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'], relations: ['status', 'program'],
            where: { is_active: true }, 
        });

        if (students.length > 0) {
            return students;
        }
        throw new NotFoundException("No active students found.");
    }

    async getById(id: number): Promise<StudentEntity | null> {
        const student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            return student;
        }
        throw new NotFoundException("Student not found.");
    }

    async getBySubstring(substring: string): Promise<StudentEntity[]> {
        const student = await this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'],
            where: {fullname: Like(`%${substring}%`)},
        })
        if (student.length > 0) {
            return student;
        }
        throw new NotFoundException("No students found with the given substring.");
    }

    async getByUsername(username: string): Promise<StudentEntity | null> {                 
        const student = await this.studentRepository.findOneBy({ username: username });
        if (student) {
            return student;
        }
        throw new NotFoundException("Student not found.");
    }

    async deleteByUsername(username: string): Promise<string> {
        const student = await this.studentRepository.findOneBy({ username: username });
        if (student) {
            await this.studentRepository.delete(student.id);
            return "Student deleted successfully.";
        }
        throw new NotFoundException("Student not found.");
    }

    async getDp(id: number) : Promise<string | null> {
      const student = await this.studentRepository.findOneBy({id: id});
      if(student?.display_picture == null){
        return "No dp"
      }
      return student.display_picture;
    }


    async sendWelcomeEmail(to: string, name: string, id: string): Promise<void> {
        try {
          await this.mailerService.sendMail({
            to,
            subject: 'Welcome to QuickQuiz',
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #4CAF50;">Hi ${name},</h2>
                <p>Welcome to <strong>QuickQuiz</strong>! 🎉</p>
                <p>Your account has been successfully created.</p>
                <p><strong>Your ID:</strong> ${id}</p>
                <p>We're excited to have you on board. 🚀</p>
                <p style="font-size: 14px; color: #888;">For any details: maruf.testai@gmail.com</p>
              </div>
            `,
          });
      
        } catch (error) {
          throw new Error('Failed to send Welcome email. Please try again later.');
        }
    } 
}