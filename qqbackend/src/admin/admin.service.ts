import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { adminData } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { TeacherEntity } from "src/teacher/teacher.entity";
import { StudentEntity } from "src/student/student.entity";
import * as bcrypt from 'bcrypt';
import { CreateTeacherDto } from "src/teacher/techer.dto";
import { StudentDto } from "src/student/student.dto";
import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class AdminService{
    constructor(@InjectRepository(AdminEntity)private adminRepository:Repository<AdminEntity>,@InjectRepository(TeacherEntity) private teacherRepository:Repository<TeacherEntity>,@InjectRepository(StudentEntity) private studentRepository:Repository<StudentEntity>, private mailerService: MailerService ){}
    
    getAdmin():string{
        return 'admin service is running!';
    }
    getAdminById(admin:number):string{
        return "admin id is "+ admin;
    }
    //   getAbdullahByNameAndId(name,id){
    //     return 'Name:' + name + ', id:' + id;
    // }
    addAdmin(adminData:object){
        return adminData;
    }
    // addAdmin2(adminData:adminData){
    //     console.log(adminData.nid);
    //     return adminData;
    // }
    // addAdminDto(adminData:adminData){
    //     console.log(adminData.name);
    //     console.log(adminData.phone);
    //         return adminData;
    // }

    getRegisteredData(admindata:adminData):object{
        console.log(admindata);
        return admindata;
    }


    async createAdmin(adminData:AdminEntity): Promise<AdminEntity>{
   
    return this.adminRepository.save(adminData);
    console.log("Admin Added");
    }

    // async createTeacher(teacherData:TeacherEntity): Promise<TeacherEntity>{
   
    // return this.teacherRepository.save(teacherData);
    // console.log("teacher Added");
    // }

    async updateCountry(id:number,country:TeacherEntity): Promise<TeacherEntity | null >{
 
    await this.teacherRepository.update(id,country);
    return this.teacherRepository.findOneBy({id:id});
 
    console.log('Update complete');
    }

    // getTeacherByDate(joiningDate: Date): Promise<TeacherEntity[]> {
    // return this.teacherRepository.find({
    // where: {
    //   date: joiningDate,
    // },
    // });
    // }
    // async getTeacherUnknownCountry():Promise<TeacherEntity[]>{
    // return this.teacherRepository.find({where:{country:'Unknown'}});
    // }

    async addAdminDto(adminData:adminData): Promise<object>{
 
    const admin= await this.adminRepository.save(adminData);
    await this.mailerService.sendMail({ 
          to: 'playinggamesforent@gmail.com', 
           
          subject: 'admin added', 
          text: 'added',  
        });
        return admin;

    }


     async loginSession(id,pass): Promise<AdminEntity    | null> {
    const check= await this.adminRepository.findOneBy({id:id});
    if(!check){
       // throw new Error('Admin Not Found! Please Check With Valid Id');
        throw new HttpException(
      {
        statusCode: 4000,
        message: 'Admin Not Found! Please Check With Valid Id (This is a custom message)',
      },
      HttpStatus.FORBIDDEN,
    );
    }
    else{
        const isMatch= await bcrypt.compare(pass,check.pass);
        if(!isMatch){
           throw new HttpException(
                 {
                   statusCode: 4001,
                   message: 'Maybe password is incorrect (This is a custom message)',
                 },
                 HttpStatus.FORBIDDEN,
               );
            console.log('Wrong Password');
 
        }
        else{
 
            return check;
        }
    }
   }


    async getAllAdmin(): Promise<AdminEntity[]>{
       //return this.adminRepository.find();
       return this.adminRepository.find({
        order:{
            id:"ASC"
        }
       })
    }

    async updateAdmin(id:number, name:AdminEntity): Promise<AdminEntity | null>{
    await this.adminRepository.update(id,name);
    return this.adminRepository.findOneBy({id:id});
    console.log('Update complete');
    }

    async deleteAdmin(id:number):Promise<void>{
    await this.adminRepository.delete(id);
    }
    
   async createTeacher(adminid: number, teacherData: CreateTeacherDto): Promise<TeacherEntity> {
  const admin = await this.adminRepository.findOneBy({ id: adminid });
  if (!admin) throw new Error('Admin not found');

  // Create a TeacherEntity from the DTO
  const teacher = this.teacherRepository.create({
    ...teacherData, // spread DTO properties
    admin,          // assign the admin relation
  });

  return this.teacherRepository.save(teacher);
}
getAllAdminWitTeacher():Promise<AdminEntity[]>{
    return this.adminRepository.find({relations:['teachers']});
 }


async getTeacherByAdminId(adminid:number):Promise<TeacherEntity[]>{
    return this.teacherRepository.find({where:{admin:{id:adminid}}})
    }
    async getAdminByTeacher(teacherId: number): Promise<AdminEntity> { 
  const teacher = await this.teacherRepository.findOne({
    where: { id: teacherId },
    relations: ['admin'], 
  });
  if (!teacher) {
    throw new Error('Teacher not found');
  }
  return teacher.admin;
}


 
async createStudent(adminid: number, studentData: StudentDto): Promise<StudentEntity> {
  const admin = await this.adminRepository.findOneBy({ id: adminid });
  if (!admin) {
    throw new Error('Admin not found');
  }

  const existing = await this.studentRepository.findOneBy({ email: studentData.email });
  if (existing) {
    throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
  }

  const student = this.studentRepository.create({
    ...studentData, // cgpa is now a number
    admin: admin,
  });

  return this.studentRepository.save(student);
}
async getAllStudents(): Promise<StudentEntity[]> {
  return this.studentRepository.find(); // returns all students
}

async getStudentsWithCgpaRange(min: number, max: number): Promise<StudentEntity[]> {
    return this.studentRepository.find({
        where: {
            cgpa: Between(min, max),
        },
    });
}





//     async addAdminDto(adminData: adminData): Promise<object> {
//     // Get all existing IDs sorted
//     const admins = await this.adminRepository.find({
//         order: { id: "ASC" },
//         select: ["id"] // only fetch id for speed
//     });

//     // Find the smallest missing ID
//     let newId = 1;
//     for (const admin of admins) {
//         if (admin.id !== newId) break;
//         newId++;
//     }

//     // Set the missing ID
//     const adminToSave = this.adminRepository.create({
//         id: newId,
//         ...adminData
//     });

//     const savedAdmin = await this.adminRepository.save(adminToSave);
//     return savedAdmin;
// }
    

   
 

    


}