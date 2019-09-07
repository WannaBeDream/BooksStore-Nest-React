import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = (): boolean => roles.includes(user.role);

    if ( user && user.role && hasRole() ) {
    return true;
    } else {
    throw new HttpException('You do not have premmission (Roles)', HttpStatus.UNAUTHORIZED);
    }
  }
}
