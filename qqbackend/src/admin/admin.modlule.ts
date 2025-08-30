import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { TeacherEntity } from "src/teacher/tables/teacher.entity";
import { StudentEntity } from "src/student/tables/student.entity";
import { StatusEntity } from "src/student/tables/status.entity";
@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, TeacherEntity, StudentEntity, StatusEntity]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'prof30280@gmail.com',
        pass: 'krgtabqwhitidqmc'
      },
    }
  })],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }