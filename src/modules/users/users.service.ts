import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from '@/common/utils/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: {
        cursor?: Prisma.UserWhereUniqueInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        skip?: number;
        take?: number;
        where?: Prisma.UserWhereInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            cursor,
            orderBy,
            skip,
            take,
            where,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(params: { data: Prisma.UserUpdateInput; where: Prisma.UserWhereUniqueInput }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
