// create-exam-questions-batch.dto.ts
import { IsInt, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ExamQuestionDto {
    @IsInt()
    exam_id: number;

    @IsInt()
    question_id: number;

    @IsInt()
    position: number;
}

export class CreateExamQuestionsBatchDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ExamQuestionDto)
    questions: ExamQuestionDto[];
}
