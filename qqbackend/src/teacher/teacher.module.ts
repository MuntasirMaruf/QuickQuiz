import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './tables/teacher.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
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
export class TeacherModule {}


