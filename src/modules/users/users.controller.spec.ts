import { Test, TestingModule } from '@nestjs/testing';
import { User, Prisma } from '@prisma/client';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { PrismaService } from '@/common/utils/prisma.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    // モック化するサービスの関数
    const mockService = {
        // 関数名はサービスと同じにする
        createUser: vi.fn().mockImplementation(
            async (user: Prisma.UserCreateInput & { name: string }): Promise<User> => ({
                // 渡されたユーザにidを付与
                id: 1,
                ...user,
            }),
        ),
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
            const createdUser = await controller.signupUser(postUser);

            // コントローラ内でサービスの関数が実行されたか(実際に動くのはモック)
            expect(service.createUser).toHaveBeenCalled();
            // コントローラは期待するユーザデータを返すか
            expect(createdUser).toEqual(expectedUser);
        });
    });
});
