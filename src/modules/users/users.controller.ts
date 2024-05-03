import { Controller, Post, Body, Get, Query, Param, Patch } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return new UserEntity(await this.usersService.create(createUserDto));
    }

    @Get()
    async findAll(
        @Query('where') where?: string,
        @Query('orderBy') orderBy: Prisma.SortOrder | undefined = 'asc',
    ): Promise<UserEntity[]> {
        const users = await this.usersService.findAll({
            orderBy,
            where,
        });

        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UserEntity | null> {
        return new UserEntity(await this.usersService.findOne(id));
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
        return new UserEntity(await this.usersService.update(id, updateUserDto));
    }
}
