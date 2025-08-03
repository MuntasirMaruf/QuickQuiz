import { IsString, IsInt, IsNotEmpty, IsEmail, Matches, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class StudentDto{

    @IsOptional()
    id?: number;

    @IsString()
    @Matches(/^[a-zA-Z0-9_]+$/, {message: 'Username must contain only letters, numbers, and underscores.'})
    username: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
        message: 'Full name must contain only letters and spaces.',
    })
    fullname: string;
    
    @IsString()
    @Matches(/^[a-z0-9-]+@[a-z]+\.aiub\.edu$/, {message: 'Email must be a valid AIUB email address.'})
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
    address: string;
    
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/, {message: 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'})
    password: string;

    @IsOptional()
    @IsString()
    display_picture: string;

    @IsInt()
    @IsOptional()
    status: number;
    
    @Type(() => Date)
    created_at: Date;
    
    @Type(() => Date)
    updated_at: Date;
    
    @IsBoolean()
    @IsOptional()
    is_active: boolean;
}