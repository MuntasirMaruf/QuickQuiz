import { Injectable } from "@nestjs/common";
import { StudentDto } from "./dtos/student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./tables/student.entity";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}
    getAll(): string {
        return 'This action returns all students';
    }

    getById(id: string): string {
        return `This action returns a student with id ${id}`;
    }

    create(studentDto: StudentDto): StudentDto {
        return studentDto;
    }

    register(student: StudentDto): Promise<Student> {
        return this.studentRepository.save(student);
    }
}