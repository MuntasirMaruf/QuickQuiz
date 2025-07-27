import {Controller,Post,UploadedFile,UseInterceptors,UsePipes,ValidationPipe,Body,BadRequestException,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer'
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dtos/teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post("register")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('myfile',
  {
    fileFilter: (req, file, callback) => {
      if (file.originalname.match(/\.(pdf)$/)) {
        callback(null, true);
      }
      else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
      }
    },
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
    storage: diskStorage({
      destination: './src/teacher/uploads',
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      },
    })
  }))
  registerTeacher(@Body() teacherDto: TeacherDto, @UploadedFile() file: Express.Multer.File) {
     teacherDto.documentName = file.filename;
    return this.teacherService.registerTeacher(teacherDto);
  }
}
