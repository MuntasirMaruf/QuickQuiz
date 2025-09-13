import { Controller, Get, Post, Param, Query, Body, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, ParseIntPipe, Put, Delete, UseGuards, Session, HttpException, HttpStatus, Patch, Res } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { adminData, adminLoginDto } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { AdminEntity } from "./admin.entity";
import { TeacherEntity } from "src/teacher/tables/teacher.entity";
import { StudentEntity } from "src/student/tables/student.entity";
import * as bcrypt from 'bcrypt';
import { SessionGuard } from "./admin.session.guard";
import { StudentDto } from "src/student/dtos/student.dto";
import { plainToInstance } from "class-transformer";
import { TeacherDto } from "src/teacher/dtos/teacher.dto";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }
  @Get()
  getAdmin(): string {
    return this.adminService.getAdmin();
  }
  // @Get('id')
  // getAdminById(@Param('id') admin: number) {
  //   return this.adminService.getAdminById(admin);
  // }
  //    @Get("/find")
  //  getAbdullahByNameAndId(@Query('name')name:string,@Query('id')id:number):string{
  //    return this.adminService.getAbdullahByNameAndId(name,id);
  //  }
  @Post('/addAdmin')
  addAdmin(@Body() adminData: object): object {
    return this.adminService.addAdmin(adminData);
  }
  // @Post('/addAdmin2')
  // addAdmin2(@Body()addAdminData2:adminData):object{
  //     return this.adminService.addAdmin2(addAdminData2);
  // }
  //   @Post('/register')
  //   @UsePipes(new ValidationPipe())
  //   @UseInterceptors(FileInterceptor('file',{

  //   fileFilter:(req,file,cb)=>{
  //     if(file.originalname.match(/^.*\.(jpg|jpeg|png|jpeg)$/))
  //       cb(null,true);
  //     else{
  //       cb(new MulterError('LIMIT_UNEXPECTED_FILE','image'),false);
  //     }

  //   },
  //   limits:{fileSize:1024 * 1024 * 2},
  //   storage: diskStorage({
  //     destination: './src/admin/Uploads',
  //     filename:function(req,file,cb){
  //       cb(null,Date.now()+file.originalname)
  //     },
  //   })

  //  }))


  // getRegisteredData(@UploadedFile() file: Express.Multer.File,@Body()admindata:adminData):object {
  // admindata.filename=file.filename;
  // console.log(file);
  // //console.log(admindata);
  // return this.adminService.getRegisteredData(admindata);

  // }



  //   @Post('/addAdminnew')
  //  createAdmin(@Body() adminData:AdminEntity):object{
  //     return this.adminService.createAdmin(adminData);
  //   }
  // @Post('/addTeacher')
  // createAgency(@Body() teacherData:TeacherEntity):object{
  //   return this.adminService.createTeacher(teacherData);
  // }
  // @Post('/updateCountry/:id')
  // updateCountry(@Param('id',ParseIntPipe)id:number, @Body()country:TeacherEntity){
  //   return this.adminService.updateCountry(id,country);
  // }

  // @Post('/getTeacherByDate/:date')
  // getTeacherByDate(@Param('date') date:Date){
  //   return this.adminService.getTeacherByDate(date)
  // }

  // @Post('/unknownCountry')
  // getUnknownCountry(){
  //   return this.adminService.getTeacherUnknownCountry();
  // }
  // @Post('/addAdminnew')
  // @UsePipes(new ValidationPipe)
  // @UseInterceptors(FileInterceptor('profilePic'))
  // async UploadFile(@UploadedFile() file: Express.Multer.File, @Body() adminData: adminData): Promise<object> {
  //   console.log(file);
  //   adminData.display_picture = file.originalname;
  //   const salt = await bcrypt.genSalt();
  //   adminData.password = await bcrypt.hash(adminData.password, salt);

  //   return this.adminService.addAdminDto(adminData);
  // }

  @Post('/addAdminnew')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilePic', {
      fileFilter: (req, file, cb) => {
        // Accept only jpg, jpeg, png
        if (file.originalname.match(/^.*\.(jpg|jpeg|png)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'profilePic'), false);
        }
      },
      limits: { fileSize: 1024 * 1024 * 2 }, // 2 MB limit
      storage: diskStorage({
        destination: './Uploads', // save files here
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname); // ✅ your style
        },
      }),
    }),
  )
  async UploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() adminData: adminData,
  ): Promise<object> {
    if (file) {
      adminData.display_picture = file.filename; // store actual saved filename
    }

    const salt = await bcrypt.genSalt();
    adminData.password = await bcrypt.hash(adminData.password, salt);

    return this.adminService.addAdminDto(adminData);
  }

  
  //   @Post('/loginAdmin')
  // async loginSession(@Body(){ id, pass }: adminData, @Session() session){

  //  const admin= await this.adminService.loginSession(id,pass);
  //  if(!admin){
  //   return { message: 'User not found' };
  //  }
  //  else{
  //   session.ID= admin.id;
  //   //session.pass=check.pass;
  //  console.log('Session Created');
  //   console.log(session);
  //  }
  // }
  @Post('/check-username')
async checkUsername(@Body() body: { username: string }) {
  const exists = await this.adminService.checkUsernameExists(body.username);
  return { exists }; // { exists: true/false }
}
@Post('/check-email')
async checkEmail(@Body() body: { email: string }) {
  const exists = await this.adminService.checkEmailExists(body.email);
  return { exists }; // { exists: true/false }
}
@Post('/check-phone')
async checkPhone(@Body() body: { phone_number: string }) {
  const exists = await this.adminService.checkPhoneExists(body.phone_number);
  return { exists }; // { exists: true/false }
}


  @Post('/loginAdmin')
async loginSession(
  @Body() body: adminLoginDto,
  @Session() session
) {
  const { id, pass } = body;

  // loginSession either returns AdminEntity or throws HttpException
  const admin = await this.adminService.loginSession(id, pass);

  // Save admin ID in session
  session.ID = admin.id;
  console.log('Session Created:', session.ID);

  // Return admin info to frontend (name, profile picture)
  return await this.adminService.getAdminWithPhotoUrl(admin);
}

  @Get('/getAdmin')
  getAllAdmin(): object {
    return this.adminService.getAllAdmin();
  }

  @Put('/updateAdmin/:id')
  updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() name: AdminEntity): object {
    return this.adminService.updateAdmin(id, name);
  }
  @Delete('/deleteAdmin/:id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deleteAdmin(id);
  }
  

  @Post('/addTeacher/:adminid')
  @UsePipes(new ValidationPipe)
  @UseGuards(SessionGuard)
  addATeacher(
    @Param('adminid', ParseIntPipe) adminid: number,
    @Body() TeacherData: TeacherDto,
    @Session() session
  ): object {
    const loggedInAdminId = session.ID;

    // Check if the admin is trying to use another ID
    if (adminid !== loggedInAdminId) {
      throw new HttpException(
        'You cannot add a teacher for another admin!',
        HttpStatus.FORBIDDEN,
      );
    }

    console.log(`Admin ${loggedInAdminId} is adding a teacher`);
    return this.adminService.createTeacher(loggedInAdminId, TeacherData);
  }
  @Get('/allAdminWithTeacher')
  getAllAdminTeacher(): Promise<AdminEntity[]> {
    return this.adminService.getAllAdminWitTeacher();
  }
  @Post('/getTeacherByAdminId/:adminid')
  getTeacherByAdminId(@Param('adminid', ParseIntPipe) id: number): Promise<TeacherEntity[]> {
    return this.adminService.getTeacherByAdminId(id);
  }
  @Get('/getAdminByTeacher/:teacherId')
  getAdminByTeacher(
    @Param('teacherId', ParseIntPipe) teacherId: number
  ): Promise<AdminEntity | null> {
    return this.adminService.getAdminByTeacher(teacherId);
  }
  @Post('addStudent')
  async addStudent(@Body() createStudentDto: StudentDto) {
    // Hash password before saving
    const salt = await bcrypt.genSalt();
    createStudentDto.password = await bcrypt.hash(createStudentDto.password, salt);

    return this.adminService.addStudent(createStudentDto);
  }


  @Post('/addStudent/:adminid')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(SessionGuard)
  addAStudent(
    @Param('adminid', ParseIntPipe) adminid: number,
    @Body() studentData: StudentDto,
    @Session() session,
  ): Promise<StudentEntity> {
    const loggedInAdminId = session.ID;

    // Check if the admin is trying to use another ID
    if (adminid !== loggedInAdminId) {
      throw new HttpException(
        'You cannot add a student for another admin!',
        HttpStatus.FORBIDDEN,
      );
    }

    console.log('Admin ${loggedInAdminId} is adding a student');

    return this.adminService.createStudent(loggedInAdminId, studentData);
  }


  @Get('/getStudents')
  getAllStudents(): Promise<StudentEntity[]> {
    return this.adminService.getAllStudents(); // or studentService.getAllStudents()
  }

  // @Get('/students/cgpa-range')
  // getStudentsCgpaRange(
  //   @Query('min') min: number,
  //   @Query('max') max: number
  // ): Promise<StudentEntity[]> {
  //   return this.adminService.getStudentsWithCgpaRange(min, max);
  // }
  @Get('/getimage/:name')
getImage(@Param('name')name,@Res() res){
  
    res.sendFile(name,{root:'./Uploads'})
}
@Get('getAdminById/:id')
async getAdminById(@Param('id') id: number) {
  const admin = await this.adminService.getAdminById(Number(id));
  return this.adminService.getAdminWithPhotoUrl(admin);
}
@Get('/check-session')
checkSession(@Session() session) {
  if (session.ID) {
    return { loggedIn: true, id: session.ID };
  } else {
    return { loggedIn: false };
  }
}
@Get('profile')
@UseGuards(SessionGuard)
async getProfile(@Session() session) {
  const admin = await this.adminService.getAdminById(session.ID);
  return this.adminService.getAdminWithPhotoUrl(admin);
}


}
