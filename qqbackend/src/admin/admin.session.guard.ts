import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (session && session.ID) {
      return true;
    }
    throw new HttpException(
      'You must be logged in as admin to perform this action',
      HttpStatus.UNAUTHORIZED
    );
  }
}
