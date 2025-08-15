// import { Controller, Post, Put, Param, Body, UsePipes, ValidationPipe, ParseIntPipe, Delete } from '@nestjs/common';
// import { CourseService } from './course.service';
// import { CourseDto } from './dtos/course.dto';

// @Controller('course')
// export class CourseController {
//   constructor(private readonly courseService: CourseService) {}

//   // Create a new course
//   @Post('create')
//   @UsePipes(new ValidationPipe({ transform: true }))
//   createCourse(@Body() courseDto: CourseDto) {
//     return this.courseService.createCourse(courseDto);
//   }

//   // Update an existing course by ID
//   @Put('update/:id')
//   updateCourse(@Param('id', ParseIntPipe) id: number, @Body() courseDto: CourseDto) {
//     return this.courseService.updateCourse(id, courseDto);
//   }

//   // Delete a course by ID
//   @Delete('delete/:id')
//   deleteCourse(@Param('id', ParseIntPipe) id: number) {
//     return this.courseService.deleteCourse(id);
//   }
// }
