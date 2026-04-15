import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      // The secret used to verify the token signature
      secretOrKey: configService.get('JWT_SECRET'),

      // ExtractJwt tells passport-jwt WHERE to find the token in the request
      // fromAuthHeaderAsBearerToken() looks for: Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false, // default is false, so we can omit it
    });
  }

  async validate(payload: { userId: number; email: string }) {
    // This method is called after the token is verified. The payload is the decoded JWT payload.
    // We can use the information in the payload to fetch the user from the database and return it.
    const user = await this.usersService.findByEmail(payload.email);
    // if (!user) throw new UnauthorizedException();
    if (!user) throw new Error('User not found'); // Nest will catch this and return 401
    return user; // This will be attached to req.user in the route handlers
  }
}
