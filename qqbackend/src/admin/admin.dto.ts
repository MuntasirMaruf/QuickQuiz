import { Type } from "class-transformer";
import { Matches,IsNotEmpty, IsEmail, IsIn, IsDate, IsUrl, Length, IsNumberString } from "class-validator";
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

id: number;
@IsNotEmpty({ message: 'Name is required' })
@Matches(/^[A-Za-z ]+$/,{message:"name must not contain any number"})
name: string;
@Matches(/[@#$&]/,{message:"password must contain one of the special character"})
pass: string;
@IsNotEmpty({ message: 'Name is required' })
uname: string;
@IsNotEmpty({ message: 'Name is required' })
add: string;
photo:string;
 

}

export interface adminLoginDto {
  id: number;
  pass: string;
}