import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, Response, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthorsService } from 'src/services/author.service';
import { Author } from 'src/models/author.model';
import { CreateAuthor } from 'src/models/create/create.author.model';
import { ApiUseTags, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('authors')
@ApiBearerAuth()
@Controller('authors')
@UseGuards(AuthGuard('jwt'))
export class AuthorsController {

    constructor(private authorsService: AuthorsService) { }

    @Get('')
    @ApiResponse({ status: 201, description: 'The authors has been successfully fetched.', type: Author})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAuthors(@Response() res) {
        const authors = await this.authorsService.findAll();
        return res.status(HttpStatus.OK).json(authors);
    }

    @Get(':authorID')
    @ApiResponse({ status: 201, description: 'The author has been successfully fetched.', type: Author})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAuthor(@Response() res, @Param('authorID') authorID) {
        const author = await this.authorsService.findOne(authorID);
        if (!author) {throw new NotFoundException('Author does not exist!'); }
        return res.status(HttpStatus.OK).json(author);
    }

    @Post('')
    @ApiResponse({ status: 201, description: 'The author has been successfully created.', type: Author})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async addAuthor(@Response() res, @Body() author: CreateAuthor) {
        const newAuthor = await this.authorsService.create(author);
        return res.status(HttpStatus.OK).json({
            message: 'Author has been submitted successfully!',
            post: newAuthor,
        });
    }

    @Put(':authorID')
    @ApiResponse({ status: 201, description: 'The author has been successfully edited.', type: Author})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async editAuthor(@Param('authorID') authorID, @Body() author: CreateAuthor) {
        const authors = await this.authorsService.update(authorID, author);
        return authors;
    }

    @Delete(':authorID')
    @ApiResponse({ status: 201, description: 'The author has been successfully deleted.', type: Author})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteAuthor(@Param('authorID') authorID) {
        const author = await this.authorsService.delete(authorID);
        return author;
    }

    @Get('author/:username')
    @ApiResponse({ status: 201, description: 'The author has been successfully deleted.', type: Author})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAuthorByName(@Response() res, @Param('username') author) {
        const fetchedAuthor = await this.authorsService.findOneByUsername(author);

        if (!fetchedAuthor) {throw new NotFoundException('Author does not exist!'); }
        return res.status(HttpStatus.OK).json(fetchedAuthor);
    }

}
