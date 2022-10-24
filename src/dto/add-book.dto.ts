import { IsNumberString, IsString } from 'class-validator';

export class AddBookDto {
  @IsString()
  isbn: string;
  @IsString()
  title: string;
  @IsString()
  author: string;
}
