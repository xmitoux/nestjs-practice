import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AqoursMembersModule } from '@/modules/aqours_members/aqours_members.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { UsersModule } from '@/modules/users/users.module';

const pinoHttp =
    process.env.NODE_ENV === 'development'
        ? {
              level: process.env.PINO_LOG_LEVEL || 'trace',
              transport: {
                  options: {
                      singleLine: true,
                      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
                  },
                  target: 'pino-pretty',
              },
          }
        : {};

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot(),
        LoggerModule.forRoot({ pinoHttp }),
        AqoursMembersModule,
        UsersModule,
        PostsModule,
    ],
    providers: [AppService],
})
export class AppModule {}
