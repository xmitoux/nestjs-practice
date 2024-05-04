import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
        });
    }

    async posts(params: {
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

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prisma.post.create({
            data,
        });
    }

    async updatePost(params: { data: Prisma.PostUpdateInput; where: Prisma.PostWhereUniqueInput }): Promise<Post> {
        const { data, where } = params;
        return this.prisma.post.update({
            data,
            where,
        });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }
}
