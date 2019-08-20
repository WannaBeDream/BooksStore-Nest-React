import { Injectable } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookRepository } from 'src/repositories/book.repository'

@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository) {}

    
    async findAll(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }

    async findOne(id: String): Promise<Book> {
        return await this.bookRepository.findOne(id);
    }

    async create(book: Book): Promise<Book> { 
        return await this.bookRepository.create(book);
    }

    async update(id: String, book: Book): Promise<Book> {
        return await this.bookRepository.update(id, book);
    }

    async delete(id: String): Promise<Book> {
        return await this.bookRepository.delete(id);
    }

    
}


