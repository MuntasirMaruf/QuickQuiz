import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { SSCQuestionCQService } from "./question_cq_ssc.service";
import { QuestionCqSSCDto } from "./dtos/question_cq_ssc.dto";


@Controller('exam_question_ssc')
export class SSCQuestionCQController {
    constructor(private readonly sscQuestionCQService: SSCQuestionCQService) {}

    @Post('create/question')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createQuestion(@Body() questionDto: QuestionCqSSCDto) {
        // Logic to create a question will go here
        return this.sscQuestionCQService.createQuestion(questionDto);
    }

    @Get('all/questions')
    async getAllQuestions() {
        return this.sscQuestionCQService.findAllQuestions();
    }

    @Post('create/exam')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createExam(@Body() examDto: any) {
        return this.sscQuestionCQService.createExam(examDto);
    }

    @Get('all/exams')
    async getAllExams() {
        return this.sscQuestionCQService.findAllExams();
    }


    @Post('create/exam_question')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createExamQuestion(@Body() examQuestionDto: any) {
        return this.sscQuestionCQService.createExamQuestion(examQuestionDto);
    }

    @Get('all/exam_questions')
    async getAllExamQuestions() {
        return this.sscQuestionCQService.findAllExamQuestions();
    }

}