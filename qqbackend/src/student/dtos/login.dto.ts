import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
  }
  