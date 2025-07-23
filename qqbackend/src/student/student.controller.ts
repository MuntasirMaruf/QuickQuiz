import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dtos/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get("all")
  getAll() {
    return this.studentService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.studentService.getById(id);
  }

  @Post("add")
  @UsePipes(new ValidationPipe())
  create(@Body() createStudentDto: StudentDto) : string {
    return this.studentService.create(createStudentDto);
  }
}