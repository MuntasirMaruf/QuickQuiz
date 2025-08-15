// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Course } from './tables/course.entity';  // Adjust path as needed
// import { Repository } from 'typeorm';
// import { CourseDto } from './dtos/course.dto';  // Adjust path as needed

// @Injectable()
// export class CourseService {
//   constructor(
//     @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
//   ) {}

//   // Create a new course
//   async createCourse(courseDto: CourseDto): Promise<Course> {
//     const course = this.courseRepository.create(courseDto);
//     return this.courseRepository.save(course);
//   }

//   // Update an existing course by ID
//   async updateCourse(id: number, courseDto: CourseDto): Promise<Course | null> {
//     const course = await this.courseRepository.findOne({ where: { id } });
//     if (!course) return null;
//     Object.assign(course, courseDto);
//     return this.courseRepository.save(course);
//   }

//   // Delete a course by ID
//   async deleteCourse(id: number): Promise<{ message: string }> {
//     const course = await this.courseRepository.findOne({ where: { id } });
//     if (course) {
//       await this.courseRepository.remove(course);
//       return { message: `Course with ID ${id} deleted successfully.` };
//     }
//     return { message: `Course with ID ${id} not found.` };
//   }
// }
