import { IsString } from 'class-validator';

export class BorrowDto {
  @IsString()
  isbn: string;
}
