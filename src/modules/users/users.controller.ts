import { Controller, Post, Body } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async signupUser(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
        return this.usersService.createUser(userData);
    }
}
