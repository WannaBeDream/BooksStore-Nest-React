import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/models/auth/auth.user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(user: string, pass: string): Promise<AuthUser> {
    const validetedUser = await this.usersService.findOneByUsername(user);
    if (validetedUser && validetedUser.password === pass) {
      const { password, ...result } = validetedUser;
      return result;
    }
    return null;
  }

   getToken(user: AuthUser): string {
        const payload: any = {};
        payload.username = user.username;
        payload.password = user.password ;

        const accessToken: string = this.jwtService.sign(payload);
        return accessToken;
      }

}
