import { NestFactory } from '@nestjs/core';
// NestFactoryが上じゃないとなぜかビルドエラーになる
// eslint-disable-next-line import/order
import { ValidationPipe } from '@nestjs/common/pipes';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }));
    await app.listen(3000);
}
bootstrap();
