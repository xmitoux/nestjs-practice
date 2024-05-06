import { Controller, Post, Body, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

import { FindOneParam } from '@/common/dto/find-one-param.dto';

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
    async findOne(@Param() { id }: FindOneParam): Promise<UserEntity> {
        return new UserEntity(await this.usersService.findOne(id));
    }

    @Patch(':id')
    async update(@Param() { id }: FindOneParam, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return new UserEntity(await this.usersService.update(id, updateUserDto));
    }

    @Delete(':id')
    async delete(@Param() { id }: FindOneParam): Promise<UserEntity> {
        return new UserEntity(await this.usersService.delete(id));
    }
}
