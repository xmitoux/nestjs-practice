import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { PostEntity } from '@/modules/posts/entities/post.entity';

export class UserEntity implements User {
    constructor({ posts, ...data }: Partial<UserEntity>) {
        Object.assign(this, data);

        if (posts) {
            this.posts = posts.map((post) => new PostEntity(post));
        }
    }

    id: number;

    name: string;

    email: string;

    posts: PostEntity[];

    @Exclude()
    password: string;

    @Expose()
    get nameWithEmail(): string {
        return `${this.name}(${this.email})`;
    }
}
