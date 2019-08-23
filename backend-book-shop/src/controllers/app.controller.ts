import { Controller, Request, Post, UseGuards,Get,Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';


@Controller('api')
export class AppController {
constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // async login(@Body() user) {
  //   return this.authService.login(user);
    
  // }
  async login(@Request() req) {
    return this.authService.login(req.body);
    
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
   getProfile(@Request() req) {
    return req.user;
  }
}