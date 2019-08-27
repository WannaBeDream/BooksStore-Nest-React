import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, Response, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('')
    async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':userID')
    async getUser(@Response() res, @Param('userID') userID) {
        const user = await this.usersService.findOne(userID);
        if (!user) {throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('')
    async addUser(@Response() res, @Body() user: User) {
        const newUser = await this.usersService.create(user);
        return res.status(HttpStatus.OK).json({
            message: 'User has been submitted successfully!',
            post: newUser,
        });
    }

    @Put(':userID')
    async editUser(@Param('userID') userID, @Body() user: User) {
        const users = await this.usersService.update(userID, user);
        return users;
    }

    @Delete(':userID')
    async deleteUser(@Param('userID') userID) {
        const user = await this.usersService.delete(userID);
        return user;
    }

    @Get('user/:username')
    async getUserByName(@Response() res, @Param('username') user) {
        const fetchedUser = await this.usersService.findOneByUsername(user);

        if (!fetchedUser) {throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json(fetchedUser);
    }

}
