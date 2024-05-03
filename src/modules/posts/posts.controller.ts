import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    async findAll(): Promise<PostModel[]> {
        return this.postsService.posts({});
    }

    @Get('feed')
    async getPublishedPosts(): Promise<PostModel[]> {
        return this.postsService.posts({
            where: { published: true },
        });
    }

    @Get(':id')
    async getPostById(@Param('id') id: number): Promise<PostModel | null> {
        return this.postsService.post({ id });
    }

    @Get('filtered-posts/:searchString')
    async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
        return this.postsService.posts({
            where: {
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            },
        });
    }

    @Post()
    async createDraft(@Body() postData: { authorEmail: string; content?: string; title: string }): Promise<PostModel> {
        const { title, content, authorEmail } = postData;
        return this.postsService.createPost({
            author: {
                connect: { email: authorEmail },
            },
            content,
            title,
        });
    }

    @Put('publish/:id')
    async publishPost(@Param('id') id: number): Promise<PostModel> {
        return this.postsService.updatePost({
            data: { published: true },
            where: { id },
        });
    }

    @Delete(':id')
    async deletePost(@Param('id') id: number): Promise<PostModel> {
        return this.postsService.deletePost({ id });
    }
}
