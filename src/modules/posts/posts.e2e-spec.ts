import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
// https://docs.nestjs.com/recipes/swc#update-imports-in-e2e-tests
import request from 'supertest';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersModule } from '../users/users.module';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostsModule } from './posts.module';

import { randomSchemaId } from '@/common/utils/test/setup-e2e';
import { setupTestingModule, resetTable } from '@/common/utils/test/test-utils';

describe('PostsController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [PostsModule, UsersModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await setupTestingModule(app);
    });

    afterEach(async () => await resetTable(['Post', 'User'], randomSchemaId));

    describe('Posts API e2e', async () => {
        const createUserDto: CreateUserDto = {
            email: 'te1abc@test.com',
            name: 'test-user',
            password: 'aaaaaa',
        };

        const createPostDto: CreatePostDto = {
            authorId: 1,
            content: 'test-content',
            title: 'test-title',
        };

        const postEntity: Partial<PostEntity> = { id: 1, ...createPostDto, published: false };

        const createTestUser = async () => {
            return request(app.getHttpServer()).post('/users').set('Accept', 'application/json').send(createUserDto);
        };

        const createTestPost = async () => {
            return request(app.getHttpServer()).post('/posts').set('Accept', 'application/json').send(createPostDto);
        };

        beforeEach(async () => {
            await createTestUser();
        });

        describe('create', () => {
            it('[POST] /posts OK', async () => {
                const res = await createTestPost();
                expect(res.status).toEqual(HttpStatus.CREATED);

                const eventResponse = res.body as PostEntity;
                expect(eventResponse).toEqual(postEntity);
            });
        });

        describe('findAll', () => {
            it('[GET] /posts empty OK', async () => {
                const res = await request(app.getHttpServer()).get('/posts');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity[];
                expect(eventResponse).toEqual([]);
            });

            it('[GET] /posts OK', async () => {
                await createTestPost();

                const res = await request(app.getHttpServer()).get('/posts');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity[];
                expect(eventResponse[0]).toEqual(postEntity);
            });
        });

        describe('findOne', () => {
            it('[GET] /posts/:id OK', async () => {
                await createTestPost();

                const res = await request(app.getHttpServer()).get('/posts/1');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity;
                // PostデータがないのでEqualで確認はしない
                expect(eventResponse).toMatchObject(postEntity);
            });
        });

        describe('update', () => {
            it('[PATCH] /posts/:id OK', async () => {
                const updatePostDto: UpdatePostDto = {
                    content: 'upd-con',
                    title: 'udpated-title',
                };

                const updatedPostEntity: Partial<PostEntity> = {
                    id: 1,
                    ...updatePostDto,
                };

                await createTestPost();

                const res = await request(app.getHttpServer())
                    .patch('/posts/1')
                    .set('Accept', 'application/json')
                    .send(updatePostDto);

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity;
                expect(eventResponse).toMatchObject(updatedPostEntity);
            });
        });

        describe('delete', () => {
            it('OK /posts/:id (DELETE)', async () => {
                await createTestPost();

                const res = await request(app.getHttpServer()).delete('/posts/1');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity;
                expect(eventResponse.id).toEqual(postEntity.id);

                const res2 = await request(app.getHttpServer()).get('/posts/1');
                expect(res2.status).toEqual(HttpStatus.NOT_FOUND);
            });
        });

        describe('publish', () => {
            const publish = async () => request(app.getHttpServer()).patch('/posts/publish/1');

            beforeEach(async () => {
                await createTestPost();
            });

            it('[PATCH] /posts/publish/:id OK', async () => {
                const res = await publish();

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity;
                expect(eventResponse.published).toEqual(true);
            });

            it('[GET] /posts/feed OK', async () => {
                const publishedEntity: Partial<PostEntity> = { ...postEntity, published: true };
                await publish();

                const res = await request(app.getHttpServer()).get('/posts/feed');

                expect(res.status).toEqual(HttpStatus.OK);

                const eventResponse = res.body as PostEntity[];
                expect(eventResponse[0]).toMatchObject(publishedEntity);
            });
        });
    });
});
