import { Post } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PostEntity implements Post {
    constructor(partial: Partial<PostEntity>) {
        Object.assign(this, partial);
    }

    id: number;
    title: string;
    content: string | null;
    authorId: number | null;

    @Exclude()
    published: boolean | null;
}
