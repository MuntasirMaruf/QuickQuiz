import { Injectable } from "@nestjs/common";
import { StudentDto } from "./dtos/student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { StudentEntity } from "./tables/student.entity";

@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>) {}

    async getAll(): Promise<StudentEntity[]> {
        // Get specific columns to avoid sending sensitive data
        return this.studentRepository.find({select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture']});

        // Get all active or valid students
        //return this.studentRepository.find({where: [{is_active: true, status: 1}]});

        // Get all active and valid students
        // return this.studentRepository.find({where: {is_active: true, status: 1}})
    }

    async getById(id: number): Promise<StudentEntity | null> {
        return this.studentRepository.findOneBy({ id: id });
    }

    async getBySubstring(substring: string): Promise<StudentEntity[]> {
        return this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture'],
            where: [{username: Like(`%${substring}%`)}]
        })
    }

    async getByUsername(username: string): Promise<StudentEntity[]> {
        return this.studentRepository.find({
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'date_of_birth', 'gender', 'address', 'display_picture'],
            where: [{username: username}]
        })
    }

    async register(dto: StudentDto): Promise<StudentEntity> {
        const studentDto = this.studentRepository.create(dto); // Create a new instance of StudentEntity
        studentDto.status = 1; // Default status is 1 (Valid)
        studentDto.is_active = true; // Default is_active is true
        studentDto.created_at = new Date();
        return this.studentRepository.save(studentDto);
    }

    async deleteByUsername(username: string): Promise<string> {
        const student = await this.studentRepository.findOneBy({ username: username });
        if (student) {
            await this.studentRepository.delete(student.id);
            return "Student deleted successfully.";
        }
        return "Student not found.";
    }

    async update(id: number, studentDto: StudentDto): Promise<StudentEntity | null> {
        const existingStudent = await this.studentRepository.findOneBy({ id: id });
        if (existingStudent) {
            await this.studentRepository.update(id, studentDto);
            return this.studentRepository.findOneBy({ id: id });
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        //await this.studentRepository.delete(id);
        let student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.status = 3; // Soft delete by setting status to 2 (Deleted)
            await this.studentRepository.update(id, student);
        }
    }

    async updateDp(id: number, displayPicture: string): Promise<StudentEntity | null> {
        const student = await this.studentRepository.findOneBy({ id: id });
        if (student) {
            student.display_picture = displayPicture;
            return this.studentRepository.save(student);
        }
        return null;
    }
}