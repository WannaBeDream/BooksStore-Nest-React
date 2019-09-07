import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, Response, HttpStatus, UseGuards  } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { CreateUser } from 'src/models/create/create.user.model';
import { ApiUseTags, ApiResponse , ApiBearerAuth  } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/Common/guards/roles.guard';
import { Roles } from 'src/Common/decorators/roles.decorator';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('')
    @Roles('user')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiResponse({ status: 201, description: 'The users has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':userID')
    @Roles('user')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUser(@Response() res, @Param('userID') userID) {
        const user = await this.usersService.findOne(userID);
        if (!user) {throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('')
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiResponse({ status: 201, description: 'The user has been successfully fetched.', type: User})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async editUser(@Param('userID') userID, @Body() user: CreateUser) {
        const users = await this.usersService.update(userID, user);
        return users;
    }

    @Delete(':userID')
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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
