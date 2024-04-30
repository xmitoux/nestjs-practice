import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/common/utils/prisma.service';
import { PostsService } from '@/modules/posts/posts.service';

describe('PostsService', () => {
    let service: PostsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostsService, PrismaService],
        }).compile();

        service = module.get<PostsService>(PostsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
