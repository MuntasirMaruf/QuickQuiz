import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class AnswerSSCDto {
    @IsString()
    @MaxLength(800)
    answer_1: string;

    @IsString()
    @MaxLength(800)
    answer_2: string;

    @IsString()
    @MaxLength(800)
    answer_3: string;

    @IsString()
    @MaxLength(800)
    answer_4: string;

    exam_question_id: number;

    exam_id: number;

    student_id: number;

    teacher_id: number;
}
