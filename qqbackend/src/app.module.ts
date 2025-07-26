import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.modlule';
import { TeacherModule } from './teacher/teacher.module';


@Module({
  imports: [StudentModule, AdminModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
