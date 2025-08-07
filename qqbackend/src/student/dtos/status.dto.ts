import { IsOptional, IsString, Matches } from 'class-validator';

export class StatusDto {
    @Matches(/^(Valid|Invalid|Deleted)$/, {message: 'Staus must be Valid/Invalid/Deleted.'})
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}