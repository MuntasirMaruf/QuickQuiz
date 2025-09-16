import { IsEnum, IsInt, IsDateString, IsNotEmpty, MaxLength, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { ExamCategory } from "../exam_category.enum";

export class ExamSSCDto {

  @IsNotEmpty()
  name: string;

  @IsEnum(ExamCategory, { message: "Category must be Regular, ModelTest, or FinalPreparation" })
  category: ExamCategory;

  @IsNotEmpty()
  @MaxLength(100)
  subject: string;

  @IsInt()
  @IsNotEmpty()
  marks: number;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  time: string;
}