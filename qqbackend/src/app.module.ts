import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.modlule';
import { TeacherModule } from './teacher/teacher.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [StudentModule, AdminModule, TeacherModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'al1aH',
      database: 'quickquiz_db',
      autoLoadEntities: true, // Automatically load entities from the application
      synchronize: true, // Synchronize the database schema with the entities
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
