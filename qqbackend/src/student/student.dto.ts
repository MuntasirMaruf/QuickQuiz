import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
export class StudentDto{

    @IsString({ message: 'Name must be a string'})
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    grade: string;
    
    constructor(name: string, age: number, grade: string) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
}