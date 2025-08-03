import { Injectable } from '@nestjs/common';
import { TeacherDto } from './dtos/teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Teacher } from './tables/teacher.entity';
import { UpdateStatusDto } from './dtos/update-status.dto';

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>) {}
  async updateStatus(id: number, status: string) : Promise<Teacher | null> {
    const teacher = await this.teacherRepository.findOneBy({ id: id });
        if (teacher) {
            teacher.status = status;
            return this.teacherRepository.save(teacher);
        }
        return null;
  }

  
  async registerTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    return this.teacherRepository.save(teacherDto);
  }
  // New method to get inactive teachers
  async getInactiveTeachers(): Promise<Teacher[]> {
    return this.teacherRepository.find({ where: { status: 'inactive' } });
  }
  // New method to get teachers older than 40
  async getTeachersOlderThan40(): Promise<Teacher[]> {
    return this.teacherRepository.find({
      where: {
        age: MoreThan(40),
      },
    });
  }
}