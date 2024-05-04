import { IsNumber } from 'class-validator';

export class FindOneParam {
    @IsNumber()
    id: number;
}
