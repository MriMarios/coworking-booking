import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres', // Твой юзер из docker-compose
      password: 'password', // Твой пароль из docker-compose
      database: 'coworking', // Твоя база
      entities: [User], // ОБЯЗАТЕЛЬНО добавь User сюда
      synchronize: true, // Только для разработки! Создает таблицы сам
    }),
    UsersModule,
  ],
})
export class AppModule {}
