import { Injectable } from "@nestjs/common";
import { StudentDto } from "./dtos/student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { StudentEntity } from "./tables/student.entity";
import { StatusEntity } from "./tables/status.entity";
import { ProgramEntity } from "./tables/program.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>,
        @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
        @InjectRepository(ProgramEntity) private readonly programRepository: Repository<ProgramEntity>
    ) {}

    async getAll(): Promise<StudentEntity[]> {
        return this.studentRepository.find({select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'], relations: ['status', 'program']});
    }

    async getById(id: number): Promise<StudentEntity | null> {
        return this.studentRepository.findOneBy({ id: id });
    }

    async getBySubstring(substring: string): Promise<StudentEntity[]> {
        return this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'],
            where: {fullname: Like(`%${substring}%`)},
        })
    }

    async getByUsername(username: string): Promise<StudentEntity[]> {
        return this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture', 'is_active'],
            where: {username: username}
        })
    }

    async register(dto: StudentDto): Promise<StudentEntity | string> {
        const status = await this.statusRepository.findOneBy({ id: 1 }); // Assuming id 1 is 'Valid'
        if (!status) {
            return "Status 'Valid' not found.";
        }

        const program = await this.programRepository.findOneBy({ id: 1 })
        if (!program) {
            return "Program not found.";
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
            return "Student with this username/email/number already exists.";
        } else {
            const studentDto = this.studentRepository.create(dto);
            studentDto.is_active = true;
            studentDto.status = status; // Safe assignment after null check
            studentDto.program = program;

            const saltRounds = 10;
            const hashed = await bcrypt.hash(dto.password, saltRounds);
            
            studentDto.password = hashed;

            await this.studentRepository.save(studentDto);
            return "Student registered successfully.";
        }
    }

    async deleteByUsername(username: string): Promise<string> {
        const student = await this.studentRepository.findOneBy({ username: username });
        if (student) {
            await this.studentRepository.delete(student.id);
            return "Student deleted successfully.";
        }
        return "Student not found.";
    }

    async update(id: number, dto: StudentDto): Promise<StudentEntity | string | null> {
        const studentDto = this.statusRepository.create(dto);
        const existingStudent = await this.studentRepository.findOneBy({ id: id });
        if (existingStudent) {
            await this.studentRepository.update(id, studentDto);
            return this.studentRepository.findOneBy({ id: id });
        }
        return "Student not found.";
    }

    async delete(id: number): Promise<string | void> {
        //await this.studentRepository.delete(id);
        const status = await this.statusRepository.findOneBy({ id: 3 }); // Assuming id 3 is 'Deleted'
        if (!status) {
            return "Status 'Valid' not found.";
        }

        let student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.status = status; // Soft delete by setting status to 3 (Deleted)
            await this.studentRepository.update(id, student);
            return "Student deleted successfully.";
        }

        return "Student not found.";
    }

    async updateDp(id: number, displayPicture: string): Promise<StudentEntity | string> {
        const student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.display_picture = displayPicture;
            return this.studentRepository.save(student);
        }
        return "Student not found.";
    }
}