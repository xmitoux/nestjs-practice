import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
// https://docs.nestjs.com/recipes/swc#update-imports-in-e2e-tests
import request from 'supertest';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersModule } from './users.module';

import { randomSchemaId } from '@/common/utils/test/setup-e2e';
import { setupTestingModule, resetTable } from '@/common/utils/test/test-utils';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [UsersModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await setupTestingModule(app);
    });

    afterEach(async () => await resetTable(['User'], randomSchemaId));

    describe('Users API e2e', () => {
        const createUserDto: CreateUserDto = {
            email: 'te1abc@test.com',
            name: 'test-user',
            password: 'aaaaaa',
        };

        const userEntity: Partial<UserEntity> = { id: 1, ...createUserDto };

        const createTestUser = async () => {
            return await request(app.getHttpServer())
                .post('/users')
                .set('Accept', 'application/json')
                .send(createUserDto);
        };

        describe('create', () => {
            it('OK /users (POST)', async () => {
                const res = await createTestUser();

                expect(res.status).toEqual(HttpStatus.CREATED);

                const eventResponse = res.body as UserEntity;
                expect(eventResponse).toEqual(userEntity);
            });
        });

        describe('findAll', () => {
            it('OK /users (GET)', async () => {
                await createTestUser();

                const res = await request(app.getHttpServer()).get('/users');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as UserEntity[];
                expect(eventResponse[0]).toEqual(userEntity);
            });
        });

        describe('findOne', () => {
            it('OK /users/:id (GET)', async () => {
                await createTestUser();

                const res = await request(app.getHttpServer()).get('/users/1');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as UserEntity;
                // PostデータがないのでEqualで確認はしない
                expect(eventResponse).toMatchObject(userEntity);
            });
        });

        describe('update', () => {
            it('OK /users/:id (PATCH)', async () => {
                const updateUserDto: UpdateUserDto = {
                    email: 'update@gmail.com',
                    name: 'udpated',
                    password: 'updated!',
                };

                const updatedUserEntity: Partial<UserEntity> = {
                    id: 1,
                    ...updateUserDto,
                };

                await createTestUser();

                const res = await request(app.getHttpServer())
                    .patch('/users/1')
                    .set('Accept', 'application/json')
                    .send(updateUserDto);

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as UserEntity;
                expect(eventResponse).toEqual(updatedUserEntity);
            });
        });

        describe('delete', () => {
            it('OK /users/:id (DELETE)', async () => {
                await createTestUser();

                const res = await request(app.getHttpServer()).delete('/users/1');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as UserEntity;
                expect(eventResponse.id).toEqual(userEntity.id);

                const res2 = await request(app.getHttpServer()).get('/users/1');

                expect(res2.status).toEqual(HttpStatus.NOT_FOUND);
            });
        });
    });
});
