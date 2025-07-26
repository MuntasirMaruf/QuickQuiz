import { Injectable } from '@nestjs/common';
import { TeacherDto } from './dtos/teacher.dto';


@Injectable()
export class TeacherService {
  createTeacher(teacherDto: TeacherDto, fileName: string) {
    return {
      message: 'Teacher registered successfully!',
      teacher: {
        ...teacherDto,
        uploadedDocument: fileName,
      },
    };
  }
}
