import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, Response, HttpStatus } from '@nestjs/common';
import { AuthorsService } from 'src/services/author.service';
import { Author } from 'src/models/author.model';

@Controller('authors')
export class AuthorsController {

    constructor(private authorsService: AuthorsService) { }

    @Get('')
    async getAuthors(@Response() res) {
        const authors = await this.authorsService.findAll();
        return res.status(HttpStatus.OK).json(authors);
    }

    @Get(':authorID')
    async getAuthor(@Response() res, @Param('authorID') authorID) {
        const author = await this.authorsService.findOne(authorID);
        if (!author) {throw new NotFoundException('Author does not exist!'); }
        return res.status(HttpStatus.OK).json(author);
    }

    @Post('')
    async addAuthor(@Response() res, @Body() author: Author) {
        const newAuthor = await this.authorsService.create(author);
        return res.status(HttpStatus.OK).json({
            message: 'Author has been submitted successfully!',
            post: newAuthor,
        });
    }

    @Put(':authorID')
    async editAuthor(@Param('authorID') authorID, @Body() author: Author) {
        const authors = await this.authorsService.update(authorID, author);
        return authors;
    }

    @Delete(':authorID')
    async deleteAuthor(@Param('authorID') authorID) {
        const author = await this.authorsService.delete(authorID);
        return author;
    }

    @Get('author/:username')
    async getAuthorByName(@Response() res, @Param('username') author) {
        const fetchedAuthor = await this.authorsService.findOneByUsername(author);

        if (!fetchedAuthor) {throw new NotFoundException('Author does not exist!'); }
        return res.status(HttpStatus.OK).json(fetchedAuthor);
    }

}
