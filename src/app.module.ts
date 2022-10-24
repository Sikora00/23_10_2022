import { Module } from '@nestjs/common';
import { AddingBook } from './adding-book';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book.controller';
import { BooksService } from './books.service';
import { InMemoryBooks } from './in-memory-books';
import { LendingController } from './lending.controller';
import { MyInterceptor } from './my-interceptor';

@Module({
  imports: [],
  controllers: [AppController, BookController, LendingController],
  providers: [
    AppService,
    AddingBook,
    InMemoryBooks,
    BooksService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: MyInterceptor,
    },
  ],
})
export class AppModule {}
