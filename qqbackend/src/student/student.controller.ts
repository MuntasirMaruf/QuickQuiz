import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
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
  getById(@Param('id') id: string) {
    return this.studentService.getById(id);          
  }

  @Post("register")
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() studentDto: StudentDto) : object {
    studentDto.status = 1;
    return this.studentService.create(studentDto);
  }

  // Example of file upload using Multer Uithout validation
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', fileName: file.originalname };
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

  @Get('photo/:name')
  getImage(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './src/student/uploads' });
  }

  @Post('register/with-photo')
  @UseInterceptors(FileInterceptor('displayPicture',
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
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() studentDto: StudentDto, @UploadedFile() file: Express.Multer.File): object {
    if (file) {
      studentDto.displayPicture = file.filename;
    }
    studentDto.status = 1;
    return this.studentService.register(studentDto);
  }

}