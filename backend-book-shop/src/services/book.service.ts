import { Injectable } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookRepository } from 'src/repositories/book.repository';
import { CreateBook } from 'src/models/create/create.book.model';
import { BookDoc } from 'src/documents/book/db.data';
import { AuthorRepository } from 'src/repositories/author.repository';

@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository, private readonly authorRepository: AuthorRepository) {}

    async findAll(): Promise<Book[]> {
        const books: BookDoc[] = await this.bookRepository.findAll();
        const booksModel: Book[] = books.map((book: BookDoc) => {
            const { id, title, description , authors, coast } = book;

            const bookModel: Book = {
              id,
              title,
              description,
              authors,
              coast,
            };
            return bookModel;
    });
        return booksModel;
    }

    async findOne(bookId: string): Promise<Book> {
        const book: BookDoc = await this.bookRepository.findOne(bookId);
        const { id, title, description , authors, coast } = book;

        const bookModel: Book = {
          id,
          title,
          description,
          authors,
          coast,
        };
        return bookModel;
    }

    async create(newBook: CreateBook): Promise<Book> {
        const book: BookDoc = await this.bookRepository.create(newBook);
        const { id, title, description , authors, coast } = book;

        const bookModel: Book = {
          id,
          title,
          description,
          authors,
          coast,
        };
        return bookModel;
    }

    async update(bookId: string, book: CreateBook): Promise<Book> {
        const updatedBook: BookDoc = await this.bookRepository.update(bookId, book);
        const { id, title, description , authors, coast } = updatedBook;

        const bookModel: Book = {
          id,
          title,
          description,
          authors,
          coast,
        };
        return bookModel;
    }

    async delete(bookId: string): Promise<Book> {
        const deletedBook: BookDoc = await this.bookRepository.delete(bookId);
        // this.authorRepository.deleteItemFromAuthors(itemId);                 // TODO
        const { id, title, description , authors, coast } = deletedBook;

        const bookModel: Book = {
          id,
          title,
          description,
          authors,
          coast,
        };
        return bookModel;
    }

}
