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
