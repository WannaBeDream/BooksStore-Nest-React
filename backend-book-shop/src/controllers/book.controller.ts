import { Controller, Get, Param, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { BooksService } from '@BooksService';
import { Book } from '../models/book.interface';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get('getAll')
    async getBooks() {
        const books = await this.booksService.findAll();
        return books;
    }

    @Get('getById/:bookID')
    async getBook(@Param('bookID') bookID) {
        const book = await this.booksService.findOne(bookID);
        return book;
    }

    @Post('create')
    async addBook(@Body() Book: Book) {
        const book = await this.booksService.create(Book);
        return book;
    }

    @Delete('')
    async deleteBook(@Query() query) {
        const books = await this.booksService.delete(query.bookID);
        return books;
    }

}
