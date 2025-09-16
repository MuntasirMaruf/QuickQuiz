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
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { QuestionCqSSCEntity } from "./tables/question_cq_ssc.entity";
import { SSCQuestionCQService } from "./question_cq_ssc.service";
import { SSCQuestionCQController } from "./question_cq_ssc.controller";
import { ExamSSCEntity } from "./tables/exam_ssc.entity";
import { ExamQuestionSSCEntity } from "./tables/exam_question_ssc.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auths/jwt_constraints";
import { AdminService } from "./dummy_admin.service";
import { AnswerSSCEntity } from "./tables/answer_ssc.entity";
import { ExamSSCController } from "./exam.controller";
import { ExamSSCService } from "./exam.service";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, StatusEntity, ProgramEntity, QuestionCqSSCEntity, ExamSSCEntity, ExamQuestionSSCEntity, AnswerSSCEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'maruf.testai@gmail.com',
          pass: 'vyvf rurx jobl ipct',
        },
      },
      defaults: {
        from: '"QuickQuiz" <quickquiz@gmail.com>',
      },
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [StudentController, StatusController, ProgramController, AuthController, SSCQuestionCQController, ExamSSCController, NotificationController],
  providers: [StudentService, StatusService, ProgramService, AuthService, SSCQuestionCQService, AdminService, ExamSSCService, NotificationService],
})
export class StudentModule { }