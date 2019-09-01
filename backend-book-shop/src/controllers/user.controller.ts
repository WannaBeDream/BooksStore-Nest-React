import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, Response, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { CreateUser } from 'src/models/create/create.user.model';
import { ApiUseTags, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('users-controller')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('')
    @ApiResponse({ status: 201, description: 'The users has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':userID')
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUser(@Response() res, @Param('userID') userID) {
        const user = await this.usersService.findOne(userID);
        if (!user) {throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('')
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async addUser(@Response() res, @Body() user: CreateUser) {
        const newUser = await this.usersService.create(user);
        return res.status(HttpStatus.OK).json({
            message: 'User has been submitted successfully!',
            post: newUser,
        });
    }

    @Put(':userID')
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async editUser(@Param('userID') userID, @Body() user: CreateUser) {
        const users = await this.usersService.update(userID, user);
        return users;
    }

    @Delete(':userID')
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteUser(@Param('userID') userID) {
        const user = await this.usersService.delete(userID);
        return user;
    }

    @Get('user/:username')
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUserByName(@Response() res, @Param('username') user) {
        const fetchedUser = await this.usersService.findOneByUsername(user);

        if (!fetchedUser) {throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json(fetchedUser);
    }

}
