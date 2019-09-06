import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/models/auth/auth.user.model';
import { JwtPayload } from 'src/models/auth/jwt.payload.model';
import { LoginResponse } from 'src/models/login-response.user.model';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
     const user = await this.usersService.findOneByUsername(payload.username);
     return user;
  }

   getToken(user: AuthUser): string {
        const payload: any = {};
        payload.username = user.username;
        payload.password = user.password ;

        const accessToken: string = this.jwtService.sign(payload);
        return accessToken;
      }

      async login(loginModel: AuthUser): Promise<LoginResponse> {
        const {username, password} = loginModel;
        const user =  await this.usersService.findOneByUsername(username);
        if (!user) {
          throw  new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        const isMath: boolean = await compare(password, user.password);
        if (!isMath) {
          throw  new HttpException(`Invalid credentials ${password} and ${user.password}`, HttpStatus.BAD_REQUEST);
        }
        const payload: JwtPayload = {
          username: user.username,
          role: user.role,
        };
        const accessToken = this.jwtService.sign(payload);
        const loginResponse: LoginResponse = {
          username: payload.username,
          role: payload.role,
          token: accessToken,
        };
        return loginResponse;
      }

}
