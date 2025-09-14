import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { StatusEntity } from "./tables/status.entity";
import { QuestionCqSSCEntity } from "./tables/question_cq_ssc.entity";
import { QuestionCqSSCDto } from "./dtos/question_cq_ssc.dto";
import { ExamSSCEntity } from "./tables/exam_ssc.entity";
import { ExamQuestionSSCEntity } from "./tables/exam_question_ssc.entity";
import { ExamSSCDto } from "./dtos/exam_ssc.dto";
import e from "express";
import { ExamQuestionSSCDto } from "./dtos/exam_question_ssc.dto";

@Injectable()
export class SSCQuestionCQService {
    constructor(
        @InjectRepository(QuestionCqSSCEntity) private readonly questionRepository: Repository<QuestionCqSSCEntity>,
        @InjectRepository(ExamSSCEntity) private readonly examRepository: Repository<ExamSSCEntity>,
        @InjectRepository(ExamQuestionSSCEntity) private readonly examQuestionRepository: Repository<ExamQuestionSSCEntity>,
        @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>
    ) { }

    async createQuestion(questionDto: QuestionCqSSCDto): Promise<QuestionCqSSCEntity> {
        const status = await this.statusRepository.findOneBy({ id: 1 }); // Assuming id 1 is 'Valid'
        if (!status) {
            throw new NotFoundException("Status 'Valid' not found.");
        }

        const question = this.questionRepository.create(questionDto);
        question.status = status;

        return await this.questionRepository.save(question);
    }

    async findAllQuestions(): Promise<QuestionCqSSCEntity[]> {
        return await this.questionRepository.find();
    }

    async findQuestionById(id: number): Promise<QuestionCqSSCEntity | null> {
        return await this.questionRepository.findOneBy({ id: id });
    }

    async findExamById(id: number): Promise<ExamSSCEntity | null> {
        return await this.examRepository.findOneBy({ id: id });
    }

    async createExam(examDto: ExamSSCDto): Promise<ExamSSCEntity> {
        const status = await this.statusRepository.findOneBy({ id: 1 }); // Assuming id 1 is 'Valid'
        if (!status) {
            throw new NotFoundException("Status 'Valid' not found.");
        }

        const exam = this.examRepository.create(examDto);
        exam.status = status;

        return await this.examRepository.save(exam);
    }

    async findAllExams(): Promise<ExamSSCEntity[]> {
        return await this.examRepository.find({ relations: ["status"] });
    }

    async createExamQuestion(examQuestionDto: ExamQuestionSSCDto): Promise<ExamQuestionSSCEntity> {
        const exam = await this.examRepository.findOneBy({ id: examQuestionDto.exam_id });
        if (!exam) {
            throw new Error("Exam not found");
        }

        const question = await this.questionRepository.findOneBy({ id: examQuestionDto.question_id_cq });
        if (!question) {
            throw new Error("Question not found");
        }

        const examQuestion = this.examQuestionRepository.create(examQuestionDto);
        examQuestion.exam_ssc = exam;
        examQuestion.question_cq_ssc = question;
        examQuestion.position = examQuestionDto.position;

        return await this.examQuestionRepository.save(examQuestion);
    }

    async findAllExamQuestions(): Promise<ExamQuestionSSCEntity[]> {
        return await this.examQuestionRepository.find({ relations: ["exam_ssc", "question_cq_ssc"] });
    }

    async findExamQuestionsByExam(examId: number): Promise<ExamQuestionSSCEntity[]> {
        return await this.examQuestionRepository.find({
            where: { exam_ssc: { id: examId } },
            relations: ['exam_ssc', 'question_cq_ssc'],
        });
    }

}