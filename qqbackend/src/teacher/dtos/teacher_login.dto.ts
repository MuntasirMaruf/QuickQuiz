import { IsString, isString } from "class-validator";

export class TeacherLoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}