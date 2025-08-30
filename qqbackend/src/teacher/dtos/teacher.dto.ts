import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export class TeacherDto {

  @IsString()
  @MaxLength(100, { message: 'Usename must not exceed 100 characters.' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username must contain only letters, numbers, and underscores.' })
  username: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z0-9 ]*$/, {
    message: 'Name must not contain special characters',
  })
  fullName: string;

  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Email must not exceed 200 characters.' })
  email: string;

  @Matches(/^01\d{9}$/, { message: 'Invalid phone number.' })
  phone_number: string;

  @IsDate()
  @Type(() => Date)  // Transform string to Date object
  date_of_birth: Date;

  @Matches(/^(Male|Female|Others)$/, { message: 'Gender must be Male/Female/Others.' })
  gender: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'Address must not exceed 300 characters.' })
  address: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  password: string;

  @IsOptional()
  @IsString()
  display_picture: string;


  //  @IsInt()
  //  @Min(18, { message: 'Teacher must be at least 18 years old' })
  //  @Max(70, { message: 'Teacher cannot be older than 70 years' })
  //  age: number;

  //  status: 'active' | 'inactive';

  // document: string;

  // @IsOptional()
  // @Type(() => CourseDto)  // Assuming a CourseDto is created
  // courses: CourseDto[];  // Courses can be passed as an array of Course DTOs

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
