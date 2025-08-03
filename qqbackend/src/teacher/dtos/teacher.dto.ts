import { Type } from 'class-transformer';
import { IsDate,  IsInt,  IsOptional,  IsString, Matches, Max, Min, MinLength } from 'class-validator';

export class TeacherDto {

   @IsInt( { message: 'Id must be integer' })
  id: number;
   @IsString()
   @Matches(/^[A-Za-z0-9 ]*$/, {
   message: 'Name must not contain special characters',
  })
    fullName: string;
     @IsInt()
     @Min(18, { message: 'Teacher must be at least 18 years old' })
     @Max(70, { message: 'Teacher cannot be older than 70 years' })
    age: number;
    @IsString()
    @IsOptional()
    email: string;
  
    phoneNumber: bigint;
     @IsString()
     @MinLength(6, { message: 'Password must be at least 6 characters long' })
     @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
     })
    password: string;
       @IsOptional()
      @IsDate()
      @Type(() => Date)  // Transform string to Date object
    dateOfBirth: Date;
     @Matches(/^(male|female|other)$/, {message: 'Gender must be male/female/others.'})
    gender: string;
    @IsOptional()
    @IsString()
    address: string;
  
    status: 'active' | 'inactive';
  
    document: string;
//   @IsInt( { message: 'Id must be integer' })
//   id: number;

//   @IsString()
//    @Matches(/^[A-Za-z0-9 ]*$/, {
//     message: 'Name must not contain special characters',
//   })
//   fullName: string;

// @IsInt()
//  @Min(18, { message: 'Teacher must be at least 18 years old' })
//  @Max(70, { message: 'Teacher cannot be older than 70 years' })
//  age: number;

//   @IsString()
//   @MinLength(6, { message: 'Password must be at least 6 characters long' })
//   @Matches(/(?=.*[a-z])/, {
//     message: 'Password must contain at least one lowercase letter',
//   })
//   password: string;

//  @Matches(/^(male|female|other)$/, {message: 'Gender must be male/female/others.'})
//   gender?: string;
  
// @IsString()
// @IsOptional()
// email: string;

//   // @IsString()
//   // @Matches(/^01\d{9}$/, {
//   //   message: 'Phone number must start with 01 and contain 11 digits',
//   // })
//   phoneNumber: bigint;

//   @IsOptional()
//   @IsDate()
//   @Type(() => Date)  // Transform string to Date object
//   dateOfBirth?: Date;

//   @IsOptional()
//   @IsString()
//   address: string;

//   @IsString()
//   status: string;

//   documentName: string;
}
