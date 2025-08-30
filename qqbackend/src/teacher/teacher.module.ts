import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './tables/teacher.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { StudentEntity } from 'src/student/tables/student.entity';
import { AdminEntity } from 'src/admin/admin.entity';
import { StatusEntity } from 'src/student/tables/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, StudentEntity, AdminEntity, StatusEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'maruf.testai@gmail.com', // Replace with your Gmail
          pass: 'vyvf rurx jobl ipct', // Replace with your app password
        },
      },
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule { }


