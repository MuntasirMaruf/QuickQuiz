import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
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
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getById(id);          
  }

  @Get('photo/:name')
  getImage(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './src/student/uploads' });
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() studentDto: StudentDto) {
    return this.studentService.register(studentDto);
  }

  @Post('update/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() studentDto: StudentDto): object {
    return this.studentService.update(id, studentDto);
  }

  @Patch('update_dp/:id')
  @UseInterceptors(FileInterceptor('display_picture',
  {
    fileFilter: (req, file, callback) => {
      if (file.originalname.match(/\.(jpg|jpeg|png|jpeg)$/)) {
        callback(null, true);
      }
      else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'photo'), false);
      }
    },
    limits: { fileSize: 1024 * 1024 * 5 },
    storage: diskStorage({
      destination: './src/student/uploads',
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      },
    })
  }))
  updateDp(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File): object {
    return this.studentService.updateDp(id, file.filename);
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number): object {
    this.studentService.delete(id);
    return { message: `Student with id ${id} deleted successfully` };
  }
}