import { Type } from 'class-transformer';
import { IsDate, IsIn, IsInt, IsOptional, IsPositive, IsString, Matches } from 'class-validator';

export class ProgramDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsPositive()
    duration: number; // Duration in months

    @Type(() => Date) 
    @IsDate()
    start_date: Date;

    @IsOptional()
    price: number;

    @IsInt()
    capacity: number;
}