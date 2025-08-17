import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from './student.service';
import * as bcrypt from 'bcrypt';
import { StudentEntity } from './tables/student.entity';

@Injectable()
export class AuthService {
  constructor(private studentService: StudentService) {}

  async validateUser(username: string, password: string): Promise<StudentEntity | null> {
    const student = await this.studentService.getByUsername(username);
    if (!student) return null;
  
    const isMatch = await bcrypt.compare(password, student.password);

    return isMatch ? student : null;
  }  
}