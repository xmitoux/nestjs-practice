import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    id: number;

    name: string;

    email: string;

    @Exclude()
    password: string;

    @Expose()
    get nameWithEmail(): string {
        return `${this.name}(${this.email})`;
    }
}
