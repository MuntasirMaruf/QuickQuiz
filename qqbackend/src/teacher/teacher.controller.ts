import {Controller, Post, Get, Put, Param, Body,UseInterceptors, UploadedFile, UsePipes,ValidationPipe, Query, BadRequestException, Patch
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dtos/teacher.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post("register")
  @UsePipes(new ValidationPipe({transform: true}))
  registerStudent(@Body() teacherDto: TeacherDto) {
    return this.teacherService.registerTeacher(teacherDto);
  }

  @Patch("update_status")
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    const { id, status } = updateStatusDto;
    return this.teacherService.updateStatus(id, status);
  }

// New route to get inactive teachers
  @Get('inactive')
  getInactiveTeachers() {
    return this.teacherService.getInactiveTeachers();
  }
// New route to get teachers older than 40
  @Get('older-than-40')
  getTeachersOlderThan40() {
    return this.teacherService.getTeachersOlderThan40();
  }
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