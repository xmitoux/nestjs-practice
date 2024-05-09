import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
// https://docs.nestjs.com/recipes/swc#update-imports-in-e2e-tests
import request from 'supertest';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

import { PrismaService } from '@/common/services/prisma.service';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            controllers: [UsersController],
            imports: [UsersModule],
            providers: [UsersService, PrismaService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Users API e2e', () => {
        describe('create API', () => {
            it('OK /users (POST)', async () => {
                const requestBody: CreateUserDto = {
                    email: 'te1abc@test.com',
                    name: 'test-user',
                    password: 'aaaaaa',
                };

                const res = await request(app.getHttpServer())
                    .post('/users')
                    .set('Accept', 'application/json')
                    .send(requestBody);

                expect(res.status).toEqual(HttpStatus.CREATED);

                const eventResponse = res.body as UserEntity;
                expect(eventResponse).toHaveProperty('id');
                expect(eventResponse).toMatchObject(requestBody);
            });
        });
    });
});
