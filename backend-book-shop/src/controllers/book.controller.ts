import { Controller, Get, Param, Post, Body, Query,NotFoundException, Delete, Put, Response,HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/book.service';
import { Book } from 'src/models/book.model';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get('')
    async getBooks(@Response() res) {
        const books = await this.booksService.findAll();
        return res.status(HttpStatus.OK).json(books);
    }

    @Get(':bookID')
    async getBook(@Response() res,@Param('bookID') bookID) {
        const book = await this.booksService.findOne(bookID);
        if (!book) throw new NotFoundException('Book does not exist!');
        return res.status(HttpStatus.OK).json(book);
    }

    @Post('')
    async addBook(@Response() res,@Body() book: Book) {
        const newBook = await this.booksService.create(book);
        return res.status(HttpStatus.OK).json({
            message: "Book has been submitted successfully!",
            post: newBook
        })
    }


    @Put(':bookID')
    async editBook(@Param('bookID') bookID: String,@Body() Book: Book) { 
        const books = await this.booksService.update(bookID,Book)
        return books;
    }

    @Delete(':bookID')
    async deleteBook(@Param(':bookID') bookID: String) {
        const books = await this.booksService.delete(bookID); 
        return books;
    }

    

}
