import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';

import { PrismaService } from '@/common/services/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: number): Promise<Post> {
        const post = await this.prisma.post.findUniqueOrThrow({
            include: {
                author: true,
            },
            where: { id },
        });

        return post;
    }

    async findAll(params: {
        cursor?: Prisma.PostWhereUniqueInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
        skip?: number;
        take?: number;
        where?: Prisma.PostWhereInput;
    }): Promise<Post[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.post.findMany({
            cursor,
            orderBy,
            skip,
            take,
            where,
        });
    }

    async create(data: CreatePostDto): Promise<Post> {
        return this.prisma.post.create({ data });
    }

    async update(params: { data: Prisma.PostUpdateInput; where: Prisma.PostWhereUniqueInput }): Promise<Post> {
        const { data, where } = params;
        return this.prisma.post.update({
            data,
            where,
        });
    }

    async delete(id: number): Promise<Post> {
        return this.prisma.post.delete({
            where: { id },
        });
    }
}
