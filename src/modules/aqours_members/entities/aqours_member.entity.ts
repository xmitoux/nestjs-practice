import { Expose } from 'class-transformer';

type ExposeProperty = 'nameWithIcon';

export class AqoursMember {
    id: number;
    name: string;
    grade: number;
    icon: string;

    @Expose()
    get nameWithIcon(): string {
        return `${this.name}${this.icon}`;
    }

    constructor(omit: Omit<AqoursMember, ExposeProperty>) {
        Object.assign(this, omit);
    }
}
