import { Controller, Request, Post, UseGuards, Get, Body, HttpStatus, HttpCode, Response, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { ApiUseTags, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from 'src/services/user.service';
import { AuthUser } from 'src/models/auth/auth.user.model';
import { CreateUser } from 'src/models/create/create.user.model';
import { LoginResponse } from 'src/models/login-response.user.model';
import { Roles } from 'src/Common/decorators/roles.decorator';
import { RolesGuard } from 'src/Common/guards/roles.guard';

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
      const onlyUser = {
        username: body.username,
        password: body.password,
        confirmPassword: body.confirmPassword,
        email: body.email,
        role: 'user',
      };
      const newUser: CreateUser = await this.usersService.create(onlyUser);
      return res.status(HttpStatus.OK).json(newUser);
  }

  @Post('registration/admin')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async registerAdmin(@Response() res: any, @Body() body: CreateUser) {
      if (!(body && body.username && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
      const checkedAdmin = await this.usersService.findOneByUsername(body.username);

      if (checkedAdmin) {
          return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
        }
      const createdAdmin = {
        username: body.username,
        password: body.password,
        confirmPassword: body.confirmPassword,
        email: body.email,
        role: 'admin',
      };
      const newAdmin: CreateUser = await this.usersService.create(createdAdmin);
      return res.status(HttpStatus.OK).json(newAdmin);
  }

  @Put('changeMe/:userID')
  @UseGuards(AuthGuard('jwt'))
  async changeMe(@Response() res: any, @Body() body: CreateUser, @Param('userID') userID) {
  if (!(body && body.username && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
  const checkedUser = await this.usersService.findOneByUsername(body.username);

  if (checkedUser) {
          return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
        }
  const onlyUser = {
        username: body.username,
        password: body.password,
        confirmPassword: body.confirmPassword,
        email: body.email,
        role: 'user',
      };
  const updatedUser: CreateUser = await this.usersService.update(userID, onlyUser);
  return res.status(HttpStatus.OK).json(updatedUser);
  }
}
