import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { Unique } from 'typeorm';
//@Unique(['email'])
export class StudentDto{

    @IsString({ message: 'Name must be a string'})
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @IsNumber()
    @Type(() => Number)  // automatically converts string → number
    cgpa?: number;
    
    
    // constructor(name: string, email: string, cgpa: number) {
    //     this.name = name;
    //     this.email = email;
    //     this.cgpa = cgpa;
    // }
}