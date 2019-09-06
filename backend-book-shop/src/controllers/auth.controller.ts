import { Controller, Request, Post, UseGuards, Get, Body, HttpStatus, HttpCode, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { ApiUseTags, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from 'src/services/user.service';
import { AuthUser } from 'src/models/auth/auth.user.model';
import { CreateUser } from 'src/models/create/create.user.model';
import { LoginResponse } from 'src/models/login-response.user.model';
import { User } from 'src/models';

@ApiUseTags('JWT')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Post('login')
  // async loginUser(@Response() res: any, @Body() body: AuthUser) {
  //   const {username, password} = body;
  //   if (!(body && body.username && body.password)) {
  //     return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
  //   }
  //   const user = await this.usersService.findOneByUsername(username);
  //   if (user) {
  //     if (await this.usersService.compareHash(password, user.passwordHash)) {
  //       return await res.status(HttpStatus.OK).json(this.authService.getToken(res.body));
  //     }
  //   }

  //   return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
  // }
  // @UseGuards(AuthGuard('jwt'))
  // @Post('register')
  // async registerUser(@Response() res: any, @Body() body: CreateUser) {
  //   if (!(body && body.username && body.password)) {
  //     return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
  //   }

  //   let user = await this.usersService.findOneByUsername(body.username);

  //   if (user) {
  //     return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
  //   } else {
  //     user = await this.usersService.create(body);
  //     if (user) {
  //       user.passwordHash = undefined;
  //     }
  //   }

  //   return res.status(HttpStatus.OK).json(user);
  // }

  @Post('login')
  async login(@Body() body: AuthUser): Promise<LoginResponse> {
    const loginResponse: LoginResponse = await this.authService.login(body);
    return loginResponse;
  }

  @Post('registration')
  async registerUser(@Response() res: any, @Body() body: CreateUser) {
      if (!(body && body.username && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
      const checkedUser = await this.usersService.findOneByUsername(body.username);

      if (checkedUser) {
          return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
        }
      const newUser: CreateUser = await this.usersService.create(body);
      return res.status(HttpStatus.OK).json(newUser);
  }
}
