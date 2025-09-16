import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { adminData } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { TeacherEntity } from "src/teacher/tables/teacher.entity";
import { StudentEntity } from "src/student/tables/student.entity";
import * as bcrypt from 'bcrypt';
import { StudentDto } from "src/student/dtos/student.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { TeacherDto } from "src/teacher/dtos/teacher.dto";

 


@Injectable()
export class AdminService {
  constructor(@InjectRepository(AdminEntity) private adminRepository: Repository<AdminEntity>,
    @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
    private mailerService: MailerService) { }

  getAdmin(): string {
    return 'admin service is running!';
  }
  // getAdminById(admin: number): string {
  //   return "admin id is " + admin;
  // }
  //   getAbdullahByNameAndId(name,id){
  //     return 'Name:' + name + ', id:' + id;
  // }
  addAdmin(adminData: object) {
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

  getRegisteredData(admindata: adminData): object {
    console.log(admindata);
    return admindata;
  }


  async createAdmin(adminData: AdminEntity): Promise<AdminEntity> {

    return this.adminRepository.save(adminData);
    console.log("Admin Added");
  }

  // async createTeacher(teacherData:TeacherEntity): Promise<TeacherEntity>{

  // return this.teacherRepository.save(teacherData);
  // console.log("teacher Added");
  // }

  async updateCountry(id: number, country: TeacherEntity): Promise<TeacherEntity | null> {

    await this.teacherRepository.update(id, country);
    return this.teacherRepository.findOneBy({ id: id });

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

async addAdminDto(adminData: adminData): Promise<object> {
  try {
    // Check for existing phone number
    const existingAdmin = await this.adminRepository.findOne({
      where: { phone_number: adminData.phone_number },
    });

    if (existingAdmin) {
      throw new BadRequestException('Phone number already exists.');
    }

    // Optional: check for email or username uniqueness
    const existingEmail = await this.adminRepository.findOne({
      where: { email: adminData.email },
    });
    if (existingEmail) {
      throw new BadRequestException('Email already exists.');
    }

    const existingUsername = await this.adminRepository.findOne({
      where: { username: adminData.username },
    });
    if (existingUsername) {
      throw new BadRequestException('Username already exists.');
    }

    // Save admin
const admin = await this.adminRepository.save(adminData);
// // ✅ Trigger Pusher event
// console.log("Triggering Pusher event for admin:", admin.id);
//     await pusher.trigger("admin-channel", "admin-created", {
//       message: `A new admin was added by ${admin.id}`,
//       adminId: admin.id,
//     });
 
await this.mailerService.sendMail({
  to: 'playinggamesforent@gmail.com',
  subject: 'Admin added',
  text: 'An admin has been added successfully.',
});
 
return admin;

  } catch (error) {
    console.error('Error saving admin:', error);

    if (error instanceof BadRequestException) throw error;

    throw new InternalServerErrorException('Failed to create admin.');
  }
}

async checkUsernameExists(username: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    return !!admin;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return !!admin;
  }

  async checkPhoneExists(phone_number: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { phone_number } });
    return !!admin;
  }


  async loginSession(id: number, pass: string): Promise<AdminEntity> {
  const admin = await this.adminRepository.findOneBy({ id });
  if (!admin) {
    throw new HttpException(
      { statusCode: 4000, message: 'Admin Not Found!' },
      HttpStatus.FORBIDDEN
    );
  }

  const isMatch = await bcrypt.compare(pass, admin.password);
  if (!isMatch) {
    throw new HttpException(
      { statusCode: 4001, message: 'Incorrect password!' },
      HttpStatus.FORBIDDEN
    );
  }

  return admin;
}



  async getAllAdmin(): Promise<AdminEntity[]> {
    //return this.adminRepository.find();
    return this.adminRepository.find({
      order: {
        id: "ASC"
      }
    })
  }

    // Fetch single admin for update
  async getAdminByIdupdate(id: number): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  // Update admin
  async updateAdminupdate(
    id: number,
    body: any,
    profilePic?: Express.Multer.File,
  ): Promise<AdminEntity> {
    const admin = await this.getAdminByIdupdate(id);

    // Update fields
    admin.username = body.username ?? admin.username;
    admin.fullname = body.fullname ?? admin.fullname;
    admin.email = body.email ?? admin.email;
    admin.phone_number = body.phone_number ?? admin.phone_number;
    admin.date_of_birth = body.date_of_birth ?? admin.date_of_birth;
    admin.gender = body.gender ?? admin.gender;
    admin.address = body.address ?? admin.address;

    // Update password if provided
    if (body.password) {
      const salt = await bcrypt.genSalt();
      admin.password = await bcrypt.hash(body.password, salt);
    }

    // Update profile picture if uploaded
    if (profilePic) {
      admin.display_picture = profilePic.filename; // Or path depending on Multer setup
    }

    return this.adminRepository.save(admin);
  }


  async getAdminByIdForImage(id: number): Promise<AdminEntity | null> {
  const admin = await this.adminRepository.findOne({ where: { id } });
  return admin || null;
}



  // async updateAdmin(id: number, name: AdminEntity): Promise<AdminEntity | null> {
  //   await this.adminRepository.update(id, name);
  //   return this.adminRepository.findOneBy({ id: id });
  //   console.log('Update complete');
  // }

  // async deleteAdmin(id: number): Promise<void> {
  //   await this.adminRepository.delete(id);
  // }

  // async createTeacher(adminid: number, teacherData: TeacherDto): Promise<TeacherEntity> {
  //   const admin = await this.adminRepository.findOneBy({ id: adminid });
  //   if (!admin) throw new Error('Admin not found');

  //   // Create a TeacherEntity from the DTO
  //   const teacher = this.teacherRepository.create({
  //     ...teacherData, // spread DTO properties
  //     admin,          // assign the admin relation
  //   });

  //   return this.teacherRepository.save(teacher);
  // }
  getAllAdminWitTeacher(): Promise<AdminEntity[]> {
    return this.adminRepository.find({ relations: ['teachers'] });
  }


  async getTeacherByAdminId(adminid: number): Promise<TeacherEntity[]> {
    return this.teacherRepository.find({ where: { admin: { id: adminid } } })
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

  async createTeacher(teacherData: TeacherDto): Promise<TeacherEntity> {
  try {
    // Create a new TeacherEntity from the DTO
    const teacher = this.teacherRepository.create(teacherData);

    // Save to DB
    return await this.teacherRepository.save(teacher);
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw new InternalServerErrorException("Failed to create teacher.");
  }
}
 async getAllTeachers(): Promise<TeacherEntity[]> {
    return this.teacherRepository.find(); // returns all teachers
  }
  // async getStudentsWithCgpaRange(min: number, max: number): Promise<StudentEntity[]> {
  //   return this.studentRepository.find({
  //     where: {
  //       cgpa: Between(min, max),
  //     },
  //   });
  // }





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

  async getAdminById(id: number): Promise<AdminEntity | null> {
  return this.adminRepository.findOneBy({ id });
}

async getAdminWithPhotoUrl(admin: AdminEntity | null): Promise<object | null> {
  if (!admin) return null;

  return {
    id: admin.id,
    name: admin.fullname,
    email: admin.email,
    username: admin.username,
    profilePic: admin.display_picture
      ? `http://localhost:3000/admin/getimage/${admin.display_picture}`
      : null, // fallback if no picture
  };
}
async addStudent(createStudentDto: StudentDto): Promise<StudentEntity> {
    // Convert date_of_birth string to Date object
    const dto = { ...createStudentDto, date_of_birth: new Date(createStudentDto.date_of_birth) };

    const student = this.studentRepository.create(dto);
    return this.studentRepository.save(student);
  }
  async deleteAdmin(id: number): Promise<boolean> {  // <- explicitly boolean
  const admin = await this.adminRepository.findOne({ where: { id } });
  if (!admin) {
    return false; // Admin not found
  }
  await this.adminRepository.remove(admin);
  return true; // Admin deleted successfully
}
async deleteAdminByUsername(username: string): Promise<boolean> {
  const admin = await this.adminRepository.findOne({ where: { username } });
  if (!admin) {
    return false; // Admin not found
  }
  await this.adminRepository.remove(admin);
  return true;
}

async deleteTeacherById(id: number): Promise<boolean> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      return false; // Teacher not found
    }
    await this.teacherRepository.remove(teacher);
    return true; // Teacher deleted successfully
  }


  async deleteStudentByUsername(username: string): Promise<boolean> {
    const student = await this.studentRepository.findOne({ where: { username } });
    if (!student) {
      return false; // Student not found
    }
    await this.studentRepository.remove(student);
    return true; // Student deleted successfully
  }


  async findByUsername(username: string): Promise<StudentEntity> {
    const student = await this.studentRepository.findOne({
      where: { username },
      relations: ['program'], // if enrolledProgram is a relation
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async getAllStudentsbyName(): Promise<StudentEntity[]> {
    return this.studentRepository.find(); // fetch all students
  }
  async updateStudentByUsername(username: string, updateData: any) {
  const student = await this.studentRepository.findOne({ where: { username } });
  if (!student) throw new Error("Student not found");

  // Only hash password if a new one is provided
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  // Update other fields
  Object.assign(student, updateData);
  return this.studentRepository.save(student);
}
async getAllTeachersforupdate() {
    return this.teacherRepository.find({
      select: ['id', 'username', 'fullname'],
    });
  }
  
async getTeacherById(id: number): Promise<TeacherEntity | null> {
  return this.teacherRepository.findOne({ where: { id } });
}
async updateTeacher(id: number, updateTeacherDto: any) {
  const teacher = await this.teacherRepository.findOne({ where: { id } });

  if (!teacher) {
    throw new NotFoundException(`Teacher with ID ${id} not found`);
  }

  // merge old data with new
  Object.assign(teacher, updateTeacherDto);

  return this.teacherRepository.save(teacher);
}
 async getAllAdminsforup() {
    return await this.adminRepository.find();
  }
  

  

}
