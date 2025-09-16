import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AnswerSSCDto } from './dtos/answer_ssc.dto';
import { ExamSSCService } from './exam.service';
import { AnswerSSCEntity } from './tables/answer_ssc.entity';


@Controller('answer_ssc')
export class ExamSSCController {
    constructor(private readonly answerService: ExamSSCService) { }

    @Post('create')
    create(@Body() dto: AnswerSSCDto): Promise<AnswerSSCEntity> {
        return this.answerService.create(dto);
    }

    @Get('all')
    findAll(): Promise<AnswerSSCEntity[]> {
        return this.answerService.findAll();
    }

    @Get('get:id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<AnswerSSCEntity> {
        return this.answerService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<AnswerSSCDto>,
    ): Promise<AnswerSSCEntity> {
        return this.answerService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.answerService.remove(id);
    }

    @Post('answers')
    getAnswers(@Body() dto: { username: string, examid: number }): Promise<AnswerSSCEntity[]> {
        return this.answerService.getAnswers(dto.username, dto.examid);
    }
}
