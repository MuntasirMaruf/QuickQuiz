import { IsIn, IsInt } from 'class-validator';

export class UpdateStatusDto {
  @IsInt()
  id: number;

  @IsIn(['active', 'inactive'])
  status: string;
}