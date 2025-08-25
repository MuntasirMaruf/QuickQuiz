import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './tables/teacher.entity';
import { Status } from './tables/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { MailerModule } from '@nestjs-modules/mailer';
// import { Course } from './tables/course.entity';
// import { CourseController } from './course.controller';
// import { CourseService } from './course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Status,]),
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
  controllers: [TeacherController, StatusController,],
  providers: [TeacherService, StatusService,],
})
export class TeacherModule {}


