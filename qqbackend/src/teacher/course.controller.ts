// import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { CourseService } from './course.service';
// import { CourseDto } from './dtos/course.dto';

// @Controller('course')
// export class CourseController {
//   constructor(private readonly courseService: CourseService) {}

//   @Post()
//   createCourse(@Body() courseDto: CourseDto) {
//     return this.courseService.createCourse(courseDto);
//   }

//   @Get()
//   findAll() {
//     return this.courseService.findAll();
//   }

//   @Post(':courseId/assign/:teacherId')
//   assignTeacher(
//     @Param('courseId', ParseIntPipe) courseId: number,
//     @Param('teacherId', ParseIntPipe) teacherId: number,
//   ) {
//     return this.courseService.assignTeacherToCourse(courseId, teacherId);
//   }
// }