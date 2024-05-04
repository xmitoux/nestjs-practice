import { ClassSerializerInterceptor } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, transform: true, whitelist: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.listen(3000);
}
bootstrap();
