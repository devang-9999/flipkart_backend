/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export interface JwtPayload {
  userid: number;
  useremail: string;
  role: string;
}

export interface JwtUser {
  userid: number;
  useremail: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_123',
    };

    super(options);
  }

  validate(payload: JwtPayload): JwtUser {
    return {
      userid: payload.userid,
      useremail: payload.useremail,
      role: payload.role,
    };
  }
}
