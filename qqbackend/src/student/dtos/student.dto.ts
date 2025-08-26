import { IsString, IsInt, IsNotEmpty, IsEmail, Matches, IsDate, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusDto } from './status.dto';
export class StudentDto{

    id: number;
    
    @IsString()
    @MaxLength(100, {message: 'Usename must not exceed 100 characters.'})
    @Matches(/^[a-zA-Z0-9_]+$/, {message: 'Username must contain only letters, numbers, and underscores.'})
    username: string;

    @IsOptional()
    @IsString()
    @MaxLength(150, {message: 'Full name must not exceed 150 characters.'})
    @Matches(/^[a-zA-Z\s]+$/, {message: 'Full name must contain only letters and spaces.'})
    fullname: string;
    
    @IsString()
    // @Matches(/^[a-z0-9-]+@[a-z]+\.aiub\.edu$/, {message: 'Email must be a valid AIUB email address.'})
    @IsEmail({}, {message: 'Email must be a valid email address.'})
    @MaxLength(200, {message: 'Email must not exceed 200 characters.'})
    email: string;
    
    @Matches(/^01\d{9}$/, {message: 'Invalid phone number.'})
    phone_number: string;
    
    @IsDate()
    @Type(() => Date)  // Transform string to Date object
    date_of_birth: Date;

    @Matches(/^(Male|Female|Others)$/, {message: 'Gender must be Male/Female/Others.'})
    gender: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(300, {message: 'Address must not exceed 300 characters.'})
    address: string;
    
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/, {message: 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'})
    password: string;

    @IsOptional()
    @IsString()
    display_picture: string;

    @IsInt()
    enrolled_program: number;
}