import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.modlule';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [StudentModule, AdminModule, TeacherModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'akash123',
      database: 'quickquiz_db',
      autoLoadEntities: true, // Automatically load entities from the application
      synchronize: true, // Synchronize the database schema with the entities
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
