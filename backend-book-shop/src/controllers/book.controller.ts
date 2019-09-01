import { Controller, Get, Param, Post, Body, Query, NotFoundException, Delete, Put, Response, HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/book.service';
import { Book } from 'src/models/book.model';
import { CreateBook } from 'src/models/create/create.book.model';
import { ApiUseTags, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('books-controller')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get('')
    @ApiResponse({ status: 201, description: 'The books has been successfully fetched.', type: Book})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getBooks(@Response() res) {
        const books = await this.booksService.findAll();
        return res.status(HttpStatus.OK).json(books);
    }

    @Get(':bookID')
    @ApiResponse({ status: 201, description: 'The book has been successfully fetched.', type: Book})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getBook(@Response() res, @Param('bookID') bookID) {
        const book = await this.booksService.findOne(bookID);
        if (!book) {throw new NotFoundException('Book does not exist!'); }
        return res.status(HttpStatus.OK).json(book);
    }

    @Post('')
    @ApiResponse({ status: 201, description: 'The book has been successfully fetched.', type: Book})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async addBook(@Response() res, @Body() book: CreateBook) {
        const newBook = await this.booksService.create(book);
        return res.status(HttpStatus.OK).json({
            message:  'Book has been submitted successfully!',
            post: newBook,
        });
    }

    @Put(':bookID')
    @ApiResponse({ status: 201, description: 'The book has been successfully fetched.', type: Book})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async editBook(@Param('bookID') bookID: string, @Body() book: CreateBook) {
        const books = await this.booksService.update(bookID, book);
        return books;
    }

    @Delete(':bookID')
    @ApiResponse({ status: 201, description: 'The book has been successfully fetched.', type: Book})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteBook(@Param(':bookID') bookID: string) {
        const books = await this.booksService.delete(bookID);
        return books;
    }

}
