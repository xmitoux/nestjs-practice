import { Injectable } from '@nestjs/common';

import { CreateAqoursMemberDto } from './dto/create-aqours_member.dto';
import { UpdateAqoursMemberDto } from './dto/update-aqours_member.dto';
import { AqoursMember } from './entities/aqours_member.entity';

@Injectable()
export class AqoursMembersService {
    private members: AqoursMember[] = [];

    create(createAqoursMemberDto: CreateAqoursMemberDto) {
        const newMember = this.addIdToNewMember(createAqoursMemberDto);
        this.members.push(newMember);

        return { addedMember: newMember };
    }

    addIdToNewMember(createAqoursMemberDto: CreateAqoursMemberDto): AqoursMember {
        const id = this.members.length + 1;
        const member = new AqoursMember({
            id,
            ...createAqoursMemberDto,
        });

        return member;
    }

    createBulk(createAqoursMemberDtos: CreateAqoursMemberDto[]) {
        createAqoursMemberDtos.forEach((createAqoursMemberDto) => {
            const newMember = this.addIdToNewMember(createAqoursMemberDto);
            this.members.push(newMember);
        });
    }

    findAll(): AqoursMember[] {
        return this.members.map((member) => new AqoursMember(member));
    }

    findOne(id: number): AqoursMember | undefined {
        const member = this.members.find((member) => member.id === id);
        if (member) {
            return new AqoursMember(member);
        }
    }

    findByIds(ids: number[]): AqoursMember[] {
        return this.members.filter((member) => ids.includes(member.id)).map((member) => new AqoursMember(member));
    }

    update(id: number, updateAqoursMemberDto: UpdateAqoursMemberDto) {
        const member = this.findOne(id);
        if (!member) {
            return;
        }

        updateAqoursMemberDto.name && (member.name = updateAqoursMemberDto.name);
        updateAqoursMemberDto.grade && (member.grade = updateAqoursMemberDto.grade);
        updateAqoursMemberDto.icon && (member.icon = updateAqoursMemberDto.icon);

        return { updatedMember: member };
    }

    remove(id: number) {
        this.members = this.members.filter((member) => member.id !== id);
    }
}
