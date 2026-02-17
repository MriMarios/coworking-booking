import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем глобальную валидацию
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет поля, которых нет в DTO
      forbidNonWhitelisted: true, // Выдает ошибку, если прислали лишние поля
      transform: true, // Автоматически преобразует типы
    }),
  );

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Ошибка при запуске приложения:', err);
});
