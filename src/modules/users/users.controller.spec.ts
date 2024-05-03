import { Test, TestingModule } from '@nestjs/testing';
import { User, Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { PrismaService } from '@/common/utils/prisma.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    // モック化するサービスの関数
    const mockService = {
        // 関数名はサービスと同じにする
        create: vi.fn().mockImplementation(
            async (user: Prisma.UserCreateInput & { name: string }): Promise<User> => ({
                // 渡されたユーザにidを付与
                id: 1,
                ...user,
            }),
        ),

        findAll: vi
            .fn()
            .mockImplementation(async (params: { orderBy?: Prisma.SortOrder; where?: string }): Promise<User[]> => {
                const { orderBy, where } = params;
                const mockUsers: User[] = [
                    { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' },
                    { email: 'fuga@yahoo.com', id: 2, name: '高海千歌' },
                    { email: 'foo@gmail.com', id: 3, name: '渡辺曜' },
                ];

                let users = [...mockUsers];

                if (where) {
                    users = users.filter((user) => user.email.endsWith(where));
                }

                if (!orderBy || orderBy === 'asc') {
                    users.sort((a, b) => a.id - b.id);
                } else if (orderBy === 'desc') {
                    users.sort((a, b) => b.id - a.id);
                }
                return users;
            }),

        findOne: vi.fn().mockImplementation(async (id: number): Promise<User | null> => {
            const mockUsers: User[] = [
                { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' },
                { email: 'fuga@yahoo.com', id: 2, name: '高海千歌' },
                { email: 'foo@gmail.com', id: 3, name: '渡辺曜' },
            ];
            return mockUsers.find((user) => user.id === id) ?? null;
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    // 実際のサービス
                    provide: UsersService,
                    // モックを指定
                    useValue: mockService,
                },
                PrismaService,
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('signup user', () => {
        it('should create new user', async () => {
            // 期待するユーザデータの返り値
            const expectedUser: User = { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' };
            // idを除外してテストデータ化
            const { id: _, ...postUser } = expectedUser;
            // コントローラを実行
            const createdUser = await controller.create(postUser as CreateUserDto);

            // コントローラ内でサービスの関数が実行されたか(実際に動くのはモック)
            expect(service.create).toHaveBeenCalled();
            // コントローラは期待するユーザデータを返すか
            expect(createdUser).toEqual(expectedUser);
        });
    });

    describe('findAll', () => {
        it('ascとフィルター', async () => {
            const orderBy: Prisma.SortOrder = 'asc';
            const where = 'gmail.com';
            const expectedUsers: User[] = [
                { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' },
                { email: 'foo@gmail.com', id: 3, name: '渡辺曜' },
            ];

            const gotUsers = await controller.findAll(where, orderBy);

            expect(service.findAll).toHaveBeenCalledWith({ orderBy, where });
            expect(gotUsers).toEqual(expectedUsers);
        });

        it('descのみ', async () => {
            const orderBy: Prisma.SortOrder = 'desc';
            const where = undefined;
            const expectedUsers: User[] = [
                { email: 'foo@gmail.com', id: 3, name: '渡辺曜' },
                { email: 'fuga@yahoo.com', id: 2, name: '高海千歌' },
                { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' },
            ];

            const gotUsers = await controller.findAll(where, orderBy);

            expect(gotUsers).toEqual(expectedUsers);
        });

        it('クエリなし', async () => {
            const orderBy = undefined;
            const where = undefined;
            const expectedUsers: User[] = [
                { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' },
                { email: 'fuga@yahoo.com', id: 2, name: '高海千歌' },
                { email: 'foo@gmail.com', id: 3, name: '渡辺曜' },
            ];

            const gotUsers = await controller.findAll(where, orderBy);

            expect(gotUsers).toEqual(expectedUsers);
        });
    });

    describe('findOne', () => {
        it('指定idのユーザが存在する', async () => {
            const expectedUser: User = { email: 'hoge@gmail.com', id: 1, name: '桜内梨子' };
            const id = 1;
            const gotUser = await controller.findOne(id);

            expect(service.findOne).toHaveBeenCalledWith(id);
            expect(gotUser).toEqual(expectedUser);
        });

        it('指定idのユーザが存在しない', async () => {
            const id = 100;
            const gotUser = await controller.findOne(id);

            expect(service.findOne).toHaveBeenCalledWith(id);
            expect(gotUser).toBeNull();
        });
    });
});
