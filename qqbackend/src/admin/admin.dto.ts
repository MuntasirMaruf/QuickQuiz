import { Type } from "class-transformer";
import { Matches,IsNotEmpty, IsEmail, IsIn, IsDate, IsUrl, Length, IsNumberString, IsOptional, IsString, MaxLength, MinLength, IsDateString } from "class-validator";
export class adminData{
    // @IsNotEmpty({ message: 'Name is required' })
    // @Matches(/^[A-Za-z ]+$/,{message:"name must not contain any number"})
    // name:string;

    // @Matches(/[@#$&]/,{message:"password must contain one of the special character"})
    // password:string;

    // @IsNotEmpty({ message: 'Phone number is required' })
    // @Matches(/^01\d{9}$/,{message: "Phone number must start with 01 and contain 11 digits"})
    // phone :string;
    // @IsNotEmpty({ message: 'NID is required' })
    // @IsNumberString({}, { message: 'NID must contain only digits' })
    // @Length(0, 5, { message: 'NID must be between 0 and 5 digits' })
    // nid: string;
   
    // filename:string;
    // @IsEmail({}, { message: 'Invalid email' })
    // @Matches(/^[^\s@]+@[^\s@]+\.xyz$/, { message: 'Email must be in aiub.edu domain' })
    // email: string;
    // @IsDate()
    // @Type(()=>Date)
    // birthDate: string;
    // @IsIn(['male', 'female'], { message: 'Gender must be male or female' })
    // gender: string;
    
    // @IsUrl({}, { message: "Must be a valid URL" })
    // // @Matches(/^https?:\/\/(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}.*$/, { message: "Must be a valid URL" })
    // socialLink: string; 

// id: number;
// @IsNotEmpty({ message: 'Name is required' })
// @Matches(/^[A-Za-z ]+$/,{message:"name must not contain any number"})
// name: string;
// @Matches(/[@#$&]/,{message:"password must contain one of the special character"})
// pass: string;
// @IsNotEmpty({ message: 'Name is required' })
// uname: string;
// @IsNotEmpty({ message: 'Name is required' })
// add: string;
// photo:string;
 
@IsString()
  @MaxLength(100, { message: 'Usename must not exceed 100 characters.' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username must contain only letters, numbers, and underscores.' })
  username: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z0-9 ]*$/, {
    message: 'Name must not contain special characters',
  })
  fullname: string;

  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Email must not exceed 200 characters.' })
  email: string;

  @Matches(/^01\d{9}$/, { message: 'Invalid phone number.' })
  phone_number: string;

  @IsDateString()
  date_of_birth: string;

  @Matches(/^(Male|Female|Others)$/, { message: 'Gender must be Male/Female/Others.' })
  gender: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'Address must not exceed 300 characters.' })
  address: string;

  @IsString()
@MinLength(8, { message: 'Password must be at least 8 characters long' })
@Matches(/(?=.*[a-z])/, { message: 'Must contain lowercase' })
@Matches(/(?=.*[A-Z])/, { message: 'Must contain uppercase' })
@Matches(/(?=.*\d)/, { message: 'Must contain a number' })
@Matches(/(?=.*[@$!%*?&])/, { message: 'Must contain a special character' })
  password: string;

  @IsOptional()
  @IsString()
  display_picture: string;

}

export interface adminLoginDto {
  id: number;
  pass: string;
}