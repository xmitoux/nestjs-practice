import { Controller, Post, Body } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async signupUser(@Body() userData: { email: string; name?: string }): Promise<UserModel> {
        return this.usersService.createUser(userData);
    }
}
