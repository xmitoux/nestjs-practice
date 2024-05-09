import { Post } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { UserEntity } from '@/modules/users/entities/user.entity';

export class PostEntity implements Post {
    constructor({ author, ...data }: Partial<PostEntity>) {
        Object.assign(this, data);

        if (author) {
            this.author = new UserEntity(author);
        }
    }

    id: number;
    title: string;
    content: string | null;
    authorId: number | null;

    author: UserEntity;

    @Exclude()
    published: boolean | null;
}
