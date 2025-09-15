import { NotFoundException, Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, ParseIntPipe, Delete, Patch, Put, Query, UseGuards, Session, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { StudentService } from './student.service';
import { StudentDto } from './dtos/student.dto';
import { StudentSessionGuard } from './auths/student_session.gaurd';
import { AdminJwtGuard } from './auths/admin_jwt.gaurd';

import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() studentDto: StudentDto) {
    return this.studentService.register(studentDto);
  }

  // Routes for student operations while logged in #################################################################################
  @UseGuards(StudentSessionGuard)
  @Get("profile")
  viewPersonalInfo(@Session() session: Record<string, any>) {
    return this.studentService.viewPersonalInfo(session.student.id);
  }

  @UseGuards(StudentSessionGuard)
  @Put("profile/update")
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePersonalInfo(@Body() studentDto: StudentDto, @Session() session: Record<string, any>) {
    return this.studentService.update(session.student.id, studentDto);
  }

  @UseGuards(StudentSessionGuard)
  @Patch("profile/update_dp")
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
  updatePersonalDp(@UploadedFile() file: Express.Multer.File, @Session() session: Record<string, any>) {
    return this.studentService.updateDp(session.student.id, file.filename);
  }

  @UseGuards(StudentSessionGuard)
  @Get('profile/get_dp')
  async getDisplayPicture(@Session() session: Record<string, any>, @Res() res) {
    const name = await this.studentService.getDp(session.student.id);
    res.sendFile(name, { root: './src/student/uploads' });
  }

  @UseGuards(StudentSessionGuard)
  @Delete("profile/delete")
  deletePersonalAccount(@Session() session: Record<string, any>) {
    const id: number = session.student.id;
    session.destroy();
    return this.studentService.delete(id);
  }

  // ##################################################################################################################################

  // Routes for admin operations ######################################################################################################


  @UseGuards(AdminJwtGuard)
  @Get("all")
  getAll() {
    return this.studentService.getAll();
  }

  @UseGuards(AdminJwtGuard)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getById(id);
  }

  @UseGuards(AdminJwtGuard)
  @Get("search/:substring")
  getBySubstring(@Param('substring') substring: string) {
    return this.studentService.getBySubstring(substring);
  }

  // @UseGuards(StudentSessionGuard)
  @Get("retrieve/:username")
  getByUsername(@Param('username') username: string) {
    return this.studentService.getByUsername(username);
  }

  @UseGuards(StudentSessionGuard)
  @Delete('remove/:username')
  deleteByUsername(@Param('username') username: string, @Session() session: Record<string, any>) {
    session.destroy();
    return this.studentService.deleteByUsername(username);
  }

  @UseGuards(StudentSessionGuard)
  @Put('update/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() studentDto: StudentDto): object {
    return this.studentService.update(id, studentDto);
  }

  @Patch("reset_password/:username")
  async resetPassword(
    @Param("username") username: string,
    @Body("password") password: string
  ) {
    if (!password || password.trim() === "") {
      throw new BadRequestException("Password is required.");
    }

    const updated = await this.studentService.resetPassword(username, password);

    if (!updated) {
      throw new NotFoundException("User not found.");
    }

    return { success: true, message: "Password reset successful." };
  }

  @UseGuards(StudentSessionGuard)
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

  @UseGuards(AdminJwtGuard)
  @Delete('delete/:id')
  delete(@Param('id') email: string) {
    return this.studentService.deleteHard(email);
  }


  @UseGuards(AdminJwtGuard)
  @Get('photo/:name')
  getImage(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './src/student/uploads' });
  }


  @Get('profile/get_dp/:id')
  async getDisplayPictureById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const name = await this.studentService.getDp(id); // string | null

    if (!name) {
      throw new NotFoundException('Profile picture not found');
    }

    const uploadDir = path.join(process.cwd(), 'src', 'student', 'uploads');
    const filePath = path.join(uploadDir, name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Profile picture not found');
    }

    return res.sendFile(name, { root: uploadDir });
  }
}

