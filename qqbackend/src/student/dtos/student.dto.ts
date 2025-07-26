import { IsString, IsInt, IsNotEmpty, IsEmail, Matches, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class StudentDto{

    @Matches(/^[a-zA-Z]+$/, {message: 'Name must contain only letters and spaces.'})
    name: string;
    
    @Matches(/^[a-z0-9-]+@[a-z]+\.aiub\.edu$/, {message: 'Email must be a valid AIUB email address.'})
    email: string;
    
    @Matches(/^01\d{9}$/, {message: 'Invalid phone number.'})
    phoneNumber: string;
    
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @Matches(/^(male|female|other)$/, {message: 'Gender must be male/female/others.'})
    gender: string;
    
    @IsString()
    address?: string;
    
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/, {message: 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'})
    password: string;

    status: number;

    displayPicture: string;
}