import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
    let controller: PostsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [PostsService, PrismaService],
        }).compile();

        controller = module.get<PostsController>(PostsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
