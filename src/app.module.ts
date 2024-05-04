import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AqoursMembersModule } from '@/modules/aqours_members/aqours_members.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
    controllers: [AppController],
    imports: [ConfigModule.forRoot(), AqoursMembersModule, UsersModule, PostsModule, PrismaModule],
    providers: [AppService],
})
export class AppModule {}
