import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from './student.service';
import * as bcrypt from 'bcrypt';
import { StudentEntity } from './tables/student.entity';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './dummy_admin.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async validateStudent(username: string, password: string): Promise<StudentEntity | null> {
    const student = await this.studentService.getByUsername(username);
    if (!student) return null;
  
    const isMatch = await bcrypt.compare(password, student.password);

    return isMatch ? student : null;
  }  

  async validateAdmin(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.adminService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { id: user.adminId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}