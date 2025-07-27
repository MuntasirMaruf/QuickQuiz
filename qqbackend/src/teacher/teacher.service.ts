import { Injectable } from '@nestjs/common';
import { TeacherDto } from './dtos/teacher.dto';


@Injectable()
export class TeacherService {
  registerTeacher(teacherDto: TeacherDto): TeacherDto {
    return teacherDto;
  }
}
