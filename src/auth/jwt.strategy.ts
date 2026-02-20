import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Говорим, что токен нужно искать в заголовке Authorization как Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ошибка, если срок токена истек
      secretOrKey: 'SECRET_KEY', // Тот же ключ, что и в модуле
    });
  }

  // 2. Сюда попадает расшифрованный Payload из токена
  validate(payload: JwtPayload) {
    // То, что мы вернем здесь, NestJS положит в объект запроса: request.user
    return { userId: payload.sub, email: payload.email };
  }
}
