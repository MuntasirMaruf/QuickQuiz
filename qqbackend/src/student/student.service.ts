import { Injectable } from "@nestjs/common";
import { StudentDto } from "./dtos/student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./tables/student.entity";

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}

    async getAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getById(id: number): Promise<Student | null> {
        return this.studentRepository.findOneBy({ id: id });
    }

    create(studentDto: StudentDto): StudentDto {
        return studentDto;
    }

    async register(studentDto: StudentDto): Promise<Student> {
        return this.studentRepository.save(studentDto);
    }

    async update(id: number, studentDto: StudentDto): Promise<Student | null> {
        await this.studentRepository.update(id, studentDto);
        return this.studentRepository.findOneBy({ id: id });
    }

    async delete(id: number): Promise<void> {
        //await this.studentRepository.delete(id);
        let student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.status = 0; // Soft delete by setting status to 0
            await this.studentRepository.save(student);
        }
    }
}