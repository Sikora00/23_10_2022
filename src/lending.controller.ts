import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BorrowDto } from './dto/borrow.dto';
import { MyGuard } from './my-guard';

@Controller()
export class LendingController {
  constructor(private readonly booksService: BooksService) {}
  private user = { books: [] };

  @Post('borrow')
  @UseGuards(MyGuard)
  borrow(@Body() { isbn }: BorrowDto) {
    const book = this.booksService.books.find((book) => book.isbn === isbn);
    if (!book) {
      throw new NotFoundException('This book does not exist');
    }
    if (this.user.books.find((book) => book.isbn === isbn)) {
      throw new BadRequestException('You already have this book');
    }
    this.user.books.push(book);
    return this.user;
  }
}
