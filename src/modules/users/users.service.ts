import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from '@/common/services/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: number): Promise<User> {
        return this.prisma.user.findUniqueOrThrow({
            include: {
                posts: {
                    select: {
                        content: true,
                        title: true,
                    },
                },
            },
            where: { id },
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

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            data,
            where: { id },
        });
    }

    async delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
