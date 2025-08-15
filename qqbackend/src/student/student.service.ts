import { Injectable } from "@nestjs/common";
import { StudentDto } from "./student.dto";

@Injectable()
export class StudentService {

    getAll(): string {
        return 'This action returns all students';
    }

    getById(id: string): string {
        return `This action returns a student with id ${id}`;
    }

    create(createStudentDto: StudentDto): string {
        return createStudentDto.name;
    }
}