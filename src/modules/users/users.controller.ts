import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
        return this.usersService.create(createUserDto);
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

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UserModel | null> {
        return this.usersService.findOne(id);
    }
}
