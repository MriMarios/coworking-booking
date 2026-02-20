import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Внедряем сервис пользователей
    private jwtService: JwtService, // Внедряем сервис токенов
  ) {}

  async signIn(email: string, pass: string) {
    // 1. Ищем пользователя в базе
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // 2. Сравниваем хешированный пароль из базы с тем, что ввел пользователь
    const isMatch = await bcrypt.compare(pass, user?.password || '');

    if (!isMatch) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // 3. Если всё ок, создаем токен
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
