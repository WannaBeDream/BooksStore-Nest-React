import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { JwtPayload } from 'src/models/auth/jwt.payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // TODO
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }
    return done(null, user);
  }
}
