import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class TeacherSessionGaurd implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        
        const request = context.switchToHttp().getRequest();
        if(request.session?.teacher) {
            return true;
        }
        throw new UnauthorizedException("Must be logged in to access this route");
    }

}