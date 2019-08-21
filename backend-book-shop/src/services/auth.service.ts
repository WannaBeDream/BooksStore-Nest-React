import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(user: string, pass: string): Promise<any> {
    const validetedUser = await this.usersService.findOneByUsername(user);
    if (validetedUser && validetedUser.password === pass) {
      const { password, ...result } = validetedUser;
      return result;
    }
    return null;
  }
}