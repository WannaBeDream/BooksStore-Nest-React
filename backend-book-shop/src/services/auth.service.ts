import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
    ) {}

  async validateUser(user: string, pass: string): Promise<any> {
    const validetedUser = await this.usersService.findOneByUsername(user);
    if (validetedUser && validetedUser.password === pass) {
      const { password, ...result } = validetedUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}