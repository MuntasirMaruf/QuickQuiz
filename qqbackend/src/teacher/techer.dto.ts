import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z]+$/,{message:"name must not contain any number"})
  name: string;
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  adminid: number;
}