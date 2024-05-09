import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

import { PrismaService } from '@/common/services/prisma.service';

describe('PostsController', () => {
    let controller: PostsController;
    let service: PostsService;
    let mockService: DeepMockProxy<PostsService>;

    beforeEach(async () => {
        mockService = mockDeep<PostsService>();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [
                {
                    // 実際のサービス
                    provide: PostsService,
                    // モックを指定
                    useValue: mockService,
                },
                PrismaService,
            ],
        }).compile();

        controller = module.get(PostsController);
        service = module.get(PostsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should be called', async () => {
            const data: CreatePostDto = { authorId: 1, title: '' };
            mockService.create.mockResolvedValue({} as PostEntity);
            await controller.create(data);

            expect(service.create).toHaveBeenCalledWith(data);
        });
    });

    describe('findAll', () => {
        it('should be called', async () => {
            mockService.findAll.mockResolvedValue([]);
            await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findPublishedPosts', () => {
        it('should be called', async () => {
            const where: Prisma.PostWhereInput = { published: true };
            mockService.findAll.mockResolvedValue([]);
            await controller.findPublishedPosts();

            expect(service.findAll).toHaveBeenCalledWith({ where });
        });
    });

    describe('findOne', () => {
        it('should be called', async () => {
            const id = 1;
            mockService.findOne.mockResolvedValue({} as PostEntity);
            await controller.findOne({ id });

            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('findFilteredPosts', () => {
        it('should be called', async () => {
            const searchString = '';
            const where: Prisma.PostWhereInput = {
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            };
            mockService.findAll.mockResolvedValue([]);
            await controller.findFilteredPosts(searchString);

            expect(service.findAll).toHaveBeenCalledWith({ where });
        });
    });

    describe('update', () => {
        it('should be called', async () => {
            const id = 1;
            const data: UpdatePostDto = { title: '' };
            const where: Prisma.PostWhereInput = { id };
            mockService.update.mockResolvedValue({} as PostEntity);
            await controller.update({ id }, data);

            expect(service.update).toHaveBeenCalledWith({ data, where });
        });
    });

    describe('publishPost', () => {
        it('should be called', async () => {
            const id = 1;
            const data: Prisma.PostUpdateInput = { published: true };
            const where: Prisma.PostWhereInput = { id };
            mockService.update.mockResolvedValue({} as PostEntity);
            await controller.publishPost({ id });

            expect(service.update).toHaveBeenCalledWith({ data, where });
        });
    });

    describe('delete', () => {
        it('should be called', async () => {
            const id = 1;
            mockService.delete.mockResolvedValue({} as PostEntity);
            await controller.delete({ id });

            expect(service.delete).toHaveBeenCalledWith(id);
        });
    });
});
