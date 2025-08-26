import { Controller, Get,Post, Param,Query,Body, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, ParseIntPipe, Put, Delete, UseGuards, Session, HttpException, HttpStatus, Patch } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { adminData, adminLoginDto } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { AdminEntity } from "./admin.entity";
import { TeacherEntity } from "src/teacher/teacher.entity";
import { StudentEntity } from "src/student/student.entity";
import * as bcrypt from 'bcrypt';
import { SessionGuard } from "./admin.session.guard";
import { CreateTeacherDto } from "src/teacher/techer.dto";
import { StudentDto } from "src/student/student.dto";
import { plainToInstance } from "class-transformer";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}
    @Get()
    getAdmin(): string{
        return this.adminService.getAdmin();
    }
    @Get('id')
    getAdminById(@Param('id')admin:number){
      return this.adminService.getAdminById(admin);
    }
  //    @Get("/find")
  //  getAbdullahByNameAndId(@Query('name')name:string,@Query('id')id:number):string{
  //    return this.adminService.getAbdullahByNameAndId(name,id);
  //  }
    @Post('/addAdmin')
    addAdmin(@Body()adminData:object):object{
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
  @Post('/addAdminnew')
  @UsePipes(new ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async UploadFile(@UploadedFile() file:Express.Multer.File, @Body() adminData:adminData):Promise<object>{
  console.log(file);
  adminData.photo=file.originalname;
  const salt= await bcrypt.genSalt();
  adminData.pass= await bcrypt.hash(adminData.pass,salt);
 
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

  @Post('/loginAdmin')
  async loginSession(@Body()body: adminLoginDto, @Session() session){
  const { id, pass } = body;
  const admin= await this.adminService.loginSession(id,pass);
  if(!admin){
  return { message: 'User not found' };
  }
  else{
  session.ID= admin.id;
  //session.pass=check.pass;
  console.log('Session Created');
  }
  }

   @Post('/getAdmin')
   getAllAdmin():object{
    return this.adminService.getAllAdmin();
   }
 
   @Put('/updateAdmin/:id')
   updateAdmin(@Param('id', ParseIntPipe) id:number, @Body()name:AdminEntity):object{
   return this.adminService.updateAdmin(id,name);
   }
   @Delete('/deleteAdmin/:id')
   deleteAdmin(@Param('id',ParseIntPipe)id:number):object{
    return this.adminService.deleteAdmin(id);
   }
 
  @Post('/addTeacher/:adminid')
  @UsePipes(new ValidationPipe)
  @UseGuards(SessionGuard)
  addATeacher(
  @Param('adminid', ParseIntPipe) adminid: number,
  @Body() TeacherData: CreateTeacherDto,
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
   getAllAdminTeacher(): Promise<AdminEntity[]>{
    return this.adminService.getAllAdminWitTeacher();
   }
   @Post('/getTeacherByAdminId/:adminid')
   getTeacherByAdminId(@Param('adminid',ParseIntPipe) id:number):Promise<TeacherEntity[]>{
  return this.adminService.getTeacherByAdminId(id);
  }
  @Get('/getAdminByTeacher/:teacherId')
  getAdminByTeacher(
  @Param('teacherId', ParseIntPipe) teacherId: number
  ): Promise<AdminEntity|null> {
  return this.adminService.getAdminByTeacher(teacherId);
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


@Post('/getStudents')
getAllStudents(): Promise<StudentEntity[]> {
  return this.adminService.getAllStudents(); // or studentService.getAllStudents()
}

@Get('/students/cgpa-range')
getStudentsCgpaRange(
  @Query('min') min: number,
  @Query('max') max: number
): Promise<StudentEntity[]> {
    return this.adminService.getStudentsWithCgpaRange(min, max);
}

}
