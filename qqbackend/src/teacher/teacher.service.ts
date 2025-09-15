import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { TeacherEntity } from './tables/teacher.entity';
import { TeacherDto } from './dtos/teacher.dto';
import * as bcrypt from 'bcrypt';
import { TeacherLoginDto } from './dtos/teacher_login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { StatusEntity } from 'src/student/tables/status.entity';
//import { Course } from './tables/course.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity) private readonly teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
    private readonly mailerService: MailerService, // Inject MailerService
  ) { }

  async teacherLogin(teacherLoginDto: TeacherLoginDto): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOne({ where: { username: teacherLoginDto.username } });
    if (!teacher) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isValidPassword = await bcrypt.compare(teacherLoginDto.password, teacher.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return teacher;
  }



  async findAll(): Promise<TeacherEntity[]> {
    return this.teacherRepository.find({ relations: ['status'] });
  }

  async registerTeacher(teacherDto: TeacherDto): Promise<TeacherEntity | string> {
    const teacher = this.teacherRepository.create(teacherDto);
    const status = await this.statusRepository.findOneBy({ id: 1 });
    if (!status) {
      return "Status not found";
    }
    teacher.status = status;
    const saltRounds = 10;
    const hashed = await bcrypt.hash(teacherDto.password, saltRounds);
    if (!hashed) {
      return "Error hashing password.";
    }
    teacher.password = hashed;

    this.sendEmail(teacherDto.email, 'Welcome to our platform', 'Welcome to QuickQuiz');
    return this.teacherRepository.save(teacher);
  }
  // //send email
  // async updateStatus(id: number, status: string): Promise<Teacher | null> {
  //   const teacher = await this.teacherRepository.findOne({ where: { id } });
  //   if (teacher) {
  //     teacher.status = status;
  //     return this.teacherRepository.save(teacher);
  //   }
  //   return null;
  // }
  //ACTIVE-STATUS
  // async getInactiveTeachers(): Promise<Teacher[]> {
  //   return this.teacherRepository.find({ where: { status: 'inactive' } });
  // }
  //AGE LESS THEN
  //   async getTeachersBelowAge(age: number): Promise<Teacher[]> {
  //   return this.teacherRepository.find({
  //     where: {
  //       age: LessThan(age), // Changed from MoreThan to LessThan
  //     },
  //   });
  // }

  //send email      
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }

  async getTeacherById(id: number): Promise<TeacherEntity | null> {
    return this.teacherRepository.findOne({ where: { id } });
  }

  async getTeacherByUsername(id: string): Promise<TeacherEntity | null> {
    return this.teacherRepository.findOne({ where: { username: id } });
  }

  async updateTeacher(id: number, teacherDto: TeacherDto): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (teacher) {
      Object.assign(teacher, teacherDto);
      return this.teacherRepository.save(teacher);
    }
    return null;
  }

  async deleteTeacher(id: number): Promise<{ message: string }> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (teacher) {
      await this.teacherRepository.remove(teacher);
      return { message: `Teacher with ID ${id} deleted successfully.` };
    }
    return { message: `Teacher with ID ${id} not found.` };
  }
  //m-one
  // async registerTeacher(teacherDto: TeacherDto): Promise<Teacher> {
  //   const { courses, ...teacherData } = teacherDto;
  //   const teacher = this.teacherRepository.create(teacherData);

  //   if (courses && courses.length > 0) {
  //     teacher.courses = await this.courseRepository.save(courses);
  //   }

  //   return this.teacherRepository.save(teacher);
  // }

  // async updateTeacher(id: number, teacherDto: TeacherDto): Promise<Teacher | null> {
  //   const teacher = await this.teacherRepository.findOne({ where: { id }, relations: ['courses'] });
  //   if (!teacher) return null;

  //   Object.assign(teacher, teacherDto);
  //   if (teacherDto.courses) {
  //     teacher.courses = await this.courseRepository.save(teacherDto.courses);
  //   }

  //   return this.teacherRepository.save(teacher);
  // }

  async updateTeacherStatus(tid: number, sid: number): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOneBy({ id: tid });
    const status = await this.statusRepository.findOneBy({ id: sid });
    if (teacher && status) {
      teacher.status = status;
      return this.teacherRepository.save(teacher);
    }
    return null;
  }

  //   //=============course---
  //   async assignCourseToTeacher(teacherId: number, courseId: number): Promise<Teacher> {
  //   const teacher = await this.teacherRepository.findOne({ 
  //     where: { id: teacherId }, 
  //     relations: ['courses'] 
  //   });
  //   const course = await this.courseRepository.findOne({ where: { id: courseId } });

  //   if (teacher && course) {
  //     teacher.courses.push(course);
  //     return this.teacherRepository.save(teacher);
  //   }
  //   return null;
  // }

  // async getTeacherCourses(teacherId: number): Promise<Course[]> {
  //   const teacher = await this.teacherRepository.findOne({ 
  //     where: { id: teacherId }, 
  //     relations: ['courses'] 
  //   });
  //   return teacher?.courses || [];
  // }
}
