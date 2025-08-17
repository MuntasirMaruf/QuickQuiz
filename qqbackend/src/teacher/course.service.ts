// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Course } from './tables/course.entity';
// import { CourseDto } from './dtos/course.dto';
// import { Teacher } from './tables/teacher.entity'; // Add this import

// @Injectable()
// export class CourseService {
//   constructor(
//     @InjectRepository(Course) 
//     private readonly courseRepository: Repository<Course>,
//     @InjectRepository(Teacher) // Inject Teacher repository
//     private readonly teacherRepository: Repository<Teacher>,
//   ) {}

//   async createCourse(courseDto: CourseDto): Promise<Course> {
//     const course = this.courseRepository.create(courseDto);
//     return this.courseRepository.save(course);
//   }

//   async findAll(): Promise<Course[]> {
//     return this.courseRepository.find({ relations: ['teachers'] });
//   }

//   async assignTeacherToCourse(courseId: number, teacherId: number): Promise<Course> {
//     const course = await this.courseRepository.findOne({ 
//       where: { id: courseId }, 
//       relations: ['teachers'] 
//     });
//     const teacher = await this.teacherRepository.findOne({ 
//       where: { id: teacherId } 
//     });
    
//     if (course && teacher) {
//       course.teachers.push(teacher);
//       return this.courseRepository.save(course);
//     }
//     return null;
//   }
// }