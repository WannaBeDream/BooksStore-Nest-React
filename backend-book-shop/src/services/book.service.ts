import { Injectable } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookRepository } from 'src/repositories/book.repository';
import { CreateBook } from 'src/models/create/create.book.model';

@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository) {}

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }

    async findOne(id: string): Promise<Book> {
        return await this.bookRepository.findOne(id);
    }

    async create(book: Book): Promise<CreateBook> {
        return await this.bookRepository.create(book);
    }

    async update(id: string, book: Book): Promise<CreateBook> {
        const updatedBook = await this.bookRepository.update(id, book);
        return updatedBook;
    }

    async delete(id: string): Promise<Book> {
        const deletedBook = await this.bookRepository.delete(id);
        return deletedBook;
    }

}
