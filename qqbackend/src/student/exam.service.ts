import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerSSCEntity } from './tables/answer_ssc.entity';
import { AnswerSSCDto } from './dtos/answer_ssc.dto';
import { StudentService } from './student.service';

@Injectable()
export class ExamSSCService {
    constructor(
        @InjectRepository(AnswerSSCEntity)
        private readonly answerRepo: Repository<AnswerSSCEntity>,
        private readonly studentService: StudentService,
    ) { }

    async create(dto: AnswerSSCDto): Promise<AnswerSSCEntity> {
        const answer = this.answerRepo.create(dto);
        return this.answerRepo.save(answer);
    }

    async findAll(): Promise<AnswerSSCEntity[]> {
        return this.answerRepo.find();
    }

    async findOne(id: number): Promise<AnswerSSCEntity> {
        const answer = await this.answerRepo.findOne({ where: { id } });
        if (!answer) throw new NotFoundException(`Answer with ID ${id} not found`);
        return answer;
    }

    async update(id: number, dto: Partial<AnswerSSCDto>): Promise<AnswerSSCEntity> {
        const answer = await this.findOne(id);
        Object.assign(answer, dto);
        return this.answerRepo.save(answer);
    }

    async remove(id: number): Promise<void> {
        const answer = await this.findOne(id);
        await this.answerRepo.remove(answer);
    }

    async getAnswers(username: string, exam_id: number): Promise<AnswerSSCEntity[]> {
        const student = await this.studentService.getByUsername(username);

        return await this.answerRepo.find({ where: { student_id: student?.id, exam_id: exam_id } })
    }
}
