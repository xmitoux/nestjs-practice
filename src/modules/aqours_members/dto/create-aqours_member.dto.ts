import { IsString, IsNumber } from 'class-validator';

export class CreateAqoursMemberDto {
    @IsString()
    name: string;

    @IsNumber()
    grade: number;

    @IsString()
    icon: string;
}
