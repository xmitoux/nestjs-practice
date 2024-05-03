import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
