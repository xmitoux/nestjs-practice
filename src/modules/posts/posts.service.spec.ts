import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

import { PrismaService } from '@/common/services/prisma.service';

describe('PostsService', () => {
    let service: PostsService;
    let prismaMock: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        prismaMock = mockDeep<PrismaClient>();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostsService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
            ],
        }).compile();

        service = module.get(PostsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should be called', async () => {
            const data: CreatePostDto = { authorId: 1, title: '' };
            await service.create(data);

            expect(prismaMock.post.create).toHaveBeenCalledWith({ data });
        });
    });

    describe('findOne', () => {
        it('should be called', async () => {
            const id = 1;
            await service.findOne(id);

            expect(prismaMock.post.findUniqueOrThrow).toHaveBeenCalledWith({
                include: {
                    author: true,
                },
                where: { id },
            });
        });
    });

    describe('findAll', () => {
        it('should be called', async () => {
            const where = { id: 1 };

            await service.findAll({ where });
            expect(prismaMock.post.findMany).toHaveBeenCalledWith({ where });
        });
    });

    describe('update', () => {
        it('should be called', async () => {
            const where = { id: 1 };
            const data: UpdatePostDto = { title: '' };

            await service.update({ data, where });
            expect(prismaMock.post.update).toHaveBeenCalledWith({ data, where });
        });
    });

    describe('delete', () => {
        it('should be called', async () => {
            const id = 1;

            await service.delete(id);
            expect(prismaMock.post.delete).toHaveBeenCalledWith({ where: { id } });
        });
    });
});
