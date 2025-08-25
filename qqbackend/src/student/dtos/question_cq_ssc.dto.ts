import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class QuestionCqSSCDto {

    @IsString()
    @MaxLength(100, { message: 'Subject must not exceed 100 characters.' })
    subject: string;

    @IsString()
    @MaxLength(100, { message: 'Chapter must not exceed 100 characters.' })
    chapter: string;
    
    @IsString()
    @MaxLength(500, { message: 'Senario must not exceed 500 characters.' })
    senario: string;

    @IsString()
    @MaxLength(200, { message: 'Question must not exceed 200 characters.' })
    question_1: string;
    @IsInt()
    marks_q1: number;

    @IsString()
    @MaxLength(200, { message: 'Question must not exceed 200 characters.' })
    question_2: string;
    @IsInt()
    marks_q2: number;

    @IsString()
    @MaxLength(200, { message: 'Question must not exceed 200 characters.' })
    question_3: string;
    @IsInt()
    marks_q3: number;

    @IsString()
    @MaxLength(200, { message: 'Question must not exceed 200 characters.' })
    question_4: string;
    @IsInt()
    marks_q4: number;

    @IsInt()
    marks_total: number;

    @IsString()
    @MaxLength(200, { message: 'Answer must not exceed 200 characters.' })
    exam_name: string;

    @IsString()
    @MaxLength(200, { message: 'Answer must not exceed 200 characters.' })
    institution: string;

    @IsInt()
    @Type(() => Number)
    year: number;
}