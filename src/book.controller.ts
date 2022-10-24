import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AddBookDto } from './dto/add-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async addBook(@Body() { isbn, title, author }: AddBookDto): Promise<string> {
    if (
      this.booksService.books.find(({ isbn: bookIsbn }) => bookIsbn === isbn)
    ) {
      throw new Error('This book is already in the system');
    }
    this.booksService.books.push({ isbn, title, author });
    return 'Book added';
  }

  @Put()
  updateBook(@Body() { isbn, title, author }): any {
    const index = this.booksService.books.findIndex(
      ({ isbn: bookIsbn }) => bookIsbn === isbn,
    );
    let book = this.booksService.books[index];

    book = { ...book, isbn, title, author };

    this.booksService.books[index] = book;
    return { book, index };
  }

  @Delete(':isbn')
  removeBook(@Param('isbn') isbn: string): void {
    this.booksService.books = this.booksService.books.filter(
      ({ isbn: bookIsbn }) => bookIsbn !== isbn,
    );
  }

  @Get()
  async getBooks(): Promise<any[]> {
    return this.booksService.books;
  }
}
