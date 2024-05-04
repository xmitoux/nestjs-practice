import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    // モック化するサービスの関数
    const mockService = {
        // 関数名はサービスと同じにする
        create: vi.fn().mockImplementation(async (_: Prisma.UserCreateInput) => {}),
        findAll: vi.fn().mockImplementation(async (_: Prisma.UserCreateInput) => []),
        findOne: vi.fn().mockImplementation(async (_: number) => {}),
        update: vi.fn().mockImplementation(async (_1: number, _2: UpdateUserDto) => {}),
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

    it('create', async () => {
        const data: CreateUserDto = { email: 'updated@hoge.mail', name: 'hoge', password: 'pass' };
        // コントローラを実行
        await controller.create(data);

        // コントローラ内でサービスの関数が実行されたか(実際に動くのはモック)
        expect(service.create).toHaveBeenCalledWith(data);
    });

    it('findAll', async () => {
        const orderBy: Prisma.SortOrder = 'asc';
        const where = 'gmail.com';
        await controller.findAll(where, orderBy);

        expect(service.findAll).toHaveBeenCalledWith({ orderBy, where });
    });

    it('findOne', async () => {
        const id = 1;
        await controller.findOne(id);

        expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('update', async () => {
        const id = 1;
        const data: UpdateUserDto = { email: 'updated@hoge.mail', name: 'updated' };
        await controller.update(id, data);

        expect(service.update).toHaveBeenCalledWith(id, data);
    });
});
