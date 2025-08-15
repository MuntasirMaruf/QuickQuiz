import { Controller, Post, Get, Put, Param, Body, UsePipes, ValidationPipe,ParseIntPipe, Query, Patch, Delete, Session, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dtos/teacher.dto';
import { Teacher } from './tables/teacher.entity';
import { StatusDto } from './dtos/status.dto';
import { TeacherLoginDto } from './dtos/teacher_login.dto';
import { TeacherSessionGaurd } from './session_teacher.gaurd';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}


  @Post('login')
  async teacherLogin(@Body() teacherLoginDto: TeacherLoginDto, @Session() session: Record<string, any> )  {
    const teacher = await this.teacherService.teacherLogin(teacherLoginDto);

    if(!teacher){
      return {message: 'Invalid credentials', status: 401}
    }
    session.teacher = teacher;
    return {message: 'Logged in successfully', status: 200}
  }

  @Post('logout')
  async teacherLogout(@Body() teacherLoginDto: TeacherLoginDto, @Session() session: Record<string, any> )  {
    const teacher = await this.teacherService.getTeacherById(session.teacher.id);

    if(!teacher){
      return {message: 'Invalid credentials', status: 401}
    }
    session.destroy();
    return {message: 'Logged out successfully', status: 200}
  }


     // GET all teachers
  @UseGuards(TeacherSessionGaurd)
  @Get('all')
  findAll() {
    return this.teacherService.findAll();
  }

    // POST create new teacher
  @Post("register")
  @UsePipes(new ValidationPipe({transform: true}))
  registerTeacher(@Body() teacherDto: TeacherDto) {
  return this.teacherService.registerTeacher(teacherDto);
  }
   // Patch update_status  teacher
  // @Patch("update_status")
  // updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
  // const { id, status } = updateStatusDto;
  // return this.teacherService.updateStatus(id, status);
  // }

// New route to get inactive teachers
//   @Get('inactive')
//   getInactiveTeachers() {
//     return this.teacherService.getInactiveTeachers();
//   }
//         // New route to get teachers age
//   @Get('byage/:age')async getTeachersBelowAge(
//   @Param('age', ParseIntPipe) age: number): Promise<Teacher[]> {
//   return this.teacherService.getTeachersBelowAge(age);
// }

  // Route to get teacher by ID
  @Get('byid/:id')
  getTeacherById(@Param('id',ParseIntPipe) id: number) {
    return this.teacherService.getTeacherById(id);
  }
   // Route to update teacher info
  @Put('update/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateTeacher(@Param('id',ParseIntPipe) id: number, @Body() teacherDto: TeacherDto) {
    return this.teacherService.updateTeacher(id, teacherDto);
  }

  //Route to delete teacher by ID
  @Delete('delete/:id')
  deleteTeacher(@Param('id',ParseIntPipe) id: number) {
    return this.teacherService.deleteTeacher(id);
  }

  // @Post("create/status")
  // createStatus(@Body() statusDto: StatusDto) {
  //   return this.teacherService.createStatus(statusDto);
  // }
 
  // 
  // // @UseInterceptors(FileInterceptor('myfile', {
  // //   fileFilter: (req, file, callback) => {
  // //     if (file.originalname.match(/\.(pdf)$/)) {
  // //       callback(null, true);
  // //     } else {
  // //       callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
  // //     }
  // //   },
  // //   limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
  // //   storage: diskStorage({
  // //     destination: './src/teacher/uploads',
  // //     filename: (req, file, callback) => {
  // //       callback(null, `${Date.now()}-${file.originalname}`);
  // //     },
  // //   })
  // // }))


  // registerTeacher(@Body() teacherDto: TeacherDto) {
  //   // if (!file) {
  //   //   throw new BadRequestException('PDF document is required');
  //   // }
  //   return this.teacherService.registerTeacher(teacherDto);
  // }

  // // @Put(':id/status')
  // // @UsePipes(new ValidationPipe())
  // // updateStatus(
  // //   @Param('id') id: number,
  // //   @Body() updateStatusDto: UpdateStatusDto
  // // ) {
  // //   return this.teacherService.updateStatus(id, updateStatusDto.status);
  // // }

  // // @Get('inactive')
  // // getInactiveTeachers() {
  // //   return this.teacherService.getInactiveTeachers();
  // // }

  // // @Get('older-than-40')
  // // getTeachersOlderThan40() {
  // //   return this.teacherService.getTeachersOlderThan40();
  // // }
}