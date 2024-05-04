import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    controllers: [PostsController],
    providers: [PrismaService, PostsService],
})
export class PostsModule {}
