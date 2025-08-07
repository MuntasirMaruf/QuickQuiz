import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./tables/student.entity";
import { StatusEntity } from "./tables/status.entity";
import { StatusController } from "./status.controller";
import { StatusService } from "./status.service";
import { ProgramEntity } from "./tables/program.entity";
import { ProgramController } from "./program.controller";
import { ProgramService } from "./program.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, StatusEntity, ProgramEntity])],
    controllers: [StudentController, StatusController, ProgramController],
    providers: [StudentService, StatusService, ProgramService],
})
export class StudentModule {}