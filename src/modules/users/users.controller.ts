import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
        return this.usersService.create(userData);
    }

    @Get()
    async findAll(
        @Query('where') where?: string,
        @Query('orderBy') orderBy: Prisma.SortOrder | undefined = 'asc',
    ): Promise<UserModel[]> {
        return this.usersService.findAll({
            orderBy,
            where,
        });
    }
}
