import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./tables/student.entity";
import { StatusEntity } from "./tables/status.entity";
import { StudentStatusController } from "./student_status.controller";
import { StudentStatusService } from "./student_status.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, StatusEntity])],
    controllers: [StudentController, StudentStatusController],
    providers: [StudentService, StudentStatusService],
})
export class StudentModule {}