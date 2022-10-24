import { Injectable } from '@nestjs/common';
import { InMemoryBooks } from './in-memory-books';

@Injectable()
export class AddingBook {
  constructor(private readonly inMemoryBooks: InMemoryBooks) {}
  execute(data): void {
    this.inMemoryBooks.books.push(data);
  }
}
