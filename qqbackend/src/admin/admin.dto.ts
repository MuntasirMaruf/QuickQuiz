import { Type } from "class-transformer";
import { Matches,IsNotEmpty, IsEmail, IsIn, IsDate } from "class-validator";
export class adminData{
    @IsNotEmpty({ message: 'Name is required' })
    @Matches(/^[A-Za-z0-9 ]+$/,{message:"name must not contain any special character"})
    name:string;

    @Matches(/^(?=.*[a-z]).{6,}$/,{message:"password must contain atleast 6 charatcer and one lowercase letter"})
    password:string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @Matches(/^01\d{9}$/,{message: "Phone number must start with 01 and contain 11 digits"})
    phone :string;
    username:string;
    filename:string;
    @IsEmail({}, { message: 'Invalid email' })
    @Matches(/@aiub\.edu$/, { message: 'Email must be in aiub.edu domain' })
    email: string;
    @IsDate()
    @Type(()=>Date)
    birthDate: string;
    @IsIn(['male', 'female'], { message: 'Gender must be male or female' })
    gender: string;
}