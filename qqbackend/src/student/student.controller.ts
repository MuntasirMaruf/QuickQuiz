import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';

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

  // Example of file upload using Multer Uithout validation
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', fileName: file.filename };
  }

  // Example of file upload with validation using Multer
  @Post("upload/photo")
  @UseInterceptors(FileInterceptor('photo',
  {
    fileFilter: (req, file, callback) => {
      if (file.originalname.match(/\.(jpg|jpeg|png|jpeg)$/)) {
        callback(null, true);
      }
      else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'photo'), false);
      }
    },
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
    storage: diskStorage({
      destination: './src/student/uploads',
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      },
    })
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', fileName: file.filename };
  }
}