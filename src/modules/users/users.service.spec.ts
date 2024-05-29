import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { PrismaService } from '@/common/services/prisma.service';

describe('UsersService', () => {
    let service: UsersService;
    let prismaMock: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        prismaMock = mockDeep<PrismaClient>();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOne', () => {
        it('should be called', async () => {
            const id = 1;

            await service.findOne(id);
            expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledWith({
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
        });
    });

    describe('findAll', () => {
        it('should be called', async () => {
            const params: { orderBy?: Prisma.SortOrder; where?: string } = {
                orderBy: 'asc',
                where: 'gmail.com',
            };

            await service.findAll(params);
            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                orderBy: { id: params.orderBy },
                where: {
                    email: { endsWith: params.where },
                },
            });
        });
    });

    describe('create', () => {
        it('should be called', async () => {
            const data: Prisma.UserCreateInput = { email: '', name: '' };

            await service.create(data);
            expect(prismaMock.user.create).toHaveBeenCalledWith({ data });
        });
    });

    describe('update', () => {
        it('should be called', async () => {
            const id = 1;
            const data: UpdateUserDto = { email: '' };

            await service.update(id, data);
            expect(prismaMock.user.update).toHaveBeenCalledWith({
                data,
                where: { id },
            });
        });
    });

    describe('delete', () => {
        it('should be called', async () => {
            const id = 1;

            await service.delete(id);
            expect(prismaMock.user.delete).toHaveBeenCalledWith({
                where: { id },
            });
        });
    });
});
