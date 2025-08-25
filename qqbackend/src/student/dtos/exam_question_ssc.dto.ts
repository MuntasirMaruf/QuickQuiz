import { IsInt, IsNotEmpty } from "class-validator";

export class ExamQuestionSSCDto {
    @IsInt()
    @IsNotEmpty()
    exam_id: number;

    @IsInt()
    @IsNotEmpty()
    question_id_cq: number;

    @IsInt()
    @IsNotEmpty()
    position: number;
}