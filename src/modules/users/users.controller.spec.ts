import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { PrismaService } from '@/common/services/prisma.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    let mockService: DeepMockProxy<UsersService>;

    beforeEach(async () => {
        mockService = mockDeep<UsersService>();

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
        mockService.create.mockResolvedValue({} as UserEntity);
        await controller.create(data);

        // コントローラ内でサービスの関数が実行されたか(実際に動くのはモック)
        expect(service.create).toHaveBeenCalledWith(data);
    });

    it('findAll', async () => {
        const orderBy: Prisma.SortOrder = 'asc';
        const where = 'gmail.com';
        mockService.findAll.mockResolvedValue([]);

        await controller.findAll(where, orderBy);

        expect(service.findAll).toHaveBeenCalledWith({ orderBy, where });
    });

    it('findOne', async () => {
        const id = 1;
        mockService.findOne.mockResolvedValue({} as UserEntity);
        await controller.findOne({ id });

        expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('update', async () => {
        const id = 1;
        const data: UpdateUserDto = { email: 'updated@hoge.mail', name: 'updated' };
        mockService.update.mockResolvedValue({} as UserEntity);
        await controller.update({ id }, data);

        expect(service.update).toHaveBeenCalledWith(id, data);
    });

    it('delete', async () => {
        const id = 1;
        mockService.delete.mockResolvedValue({} as UserEntity);
        await controller.delete({ id });

        expect(service.delete).toHaveBeenCalledWith(id);
    });
});
