import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './tables/teacher.entity';
import { Status } from './tables/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Status])],
  controllers: [TeacherController,StatusController],
  providers: [TeacherService,StatusService],
})
export class TeacherModule {}

