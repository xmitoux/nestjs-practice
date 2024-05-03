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

    async findAll(params: { orderBy?: Prisma.SortOrder; where?: string }): Promise<User[]> {
        const { where, orderBy } = params;
        return this.prisma.user.findMany({
            orderBy: { id: orderBy },
            where: {
                email: { endsWith: where },
            },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
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
