import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { ApiUseTags, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('JWT-controller')
@ApiBearerAuth()
@Controller('login')
export class AppController {
constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('')
  @ApiResponse({ status: 201, description: 'The TOKEN has been successfully fetched.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async login(@Request() req) {
    return this.authService.getToken(req.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  @ApiResponse({ status: 201, description: 'The username and password has been successfully fetched.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
   getProfile(@Request() req) {
    return req.user;
  }
}
