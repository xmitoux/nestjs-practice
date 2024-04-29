import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { PrismaService } from '@/common/utils/prisma.service';

@Module({
    controllers: [UsersController],
    providers: [PrismaService, UsersService],
})
export class UsersModule {}
