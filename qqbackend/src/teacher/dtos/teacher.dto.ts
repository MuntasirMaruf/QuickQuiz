import { IsString, Matches, MinLength } from 'class-validator';

export class TeacherDto {

  @IsString()
   @Matches(/^[A-Za-z0-9 ]*$/, {
    message: 'Name must not contain special characters',
  })
  name: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  password: string;

  @IsString()
  @Matches(/^01[0-9]{9}$/, {
    message: 'Phone number must start with 01 and contain 11 digits',
  })
  phoneNumber: string;

  documentName: string;
}
