import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseArrayPipe } from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';

import { AqoursMembersService } from './aqours_members.service';
import { CreateAqoursMemberDto } from './dto/create-aqours_member.dto';
import { UpdateAqoursMemberDto } from './dto/update-aqours_member.dto';
import { AqoursMember } from './entities/aqours_member.entity';

@Controller('aqours-members')
export class AqoursMembersController {
    constructor(private readonly aqoursMembersService: AqoursMembersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createAqoursMemberDto: CreateAqoursMemberDto) {
        return this.aqoursMembersService.create(createAqoursMemberDto);
    }

    @Post('bulk')
    createBulk(
        @Body(new ParseArrayPipe({ items: CreateAqoursMemberDto }))
        createAqoursMemberDtos: CreateAqoursMemberDto[],
    ) {
        return this.aqoursMembersService.createBulk(createAqoursMemberDtos);
    }

    @Get()
    findAll(): AqoursMember[] {
        return this.aqoursMembersService.findAll();
    }

    @Get('by-ids')
    findByIds(
        @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
        ids: number[],
    ): AqoursMember[] {
        return this.aqoursMembersService.findByIds(ids);
    }

    @Get(':id')
    findOne(@Param('id') id: number): AqoursMember | undefined {
        const member = this.aqoursMembersService.findOne(id);
        return member;
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateAqoursMemberDto: UpdateAqoursMemberDto) {
        return this.aqoursMembersService.update(id, updateAqoursMemberDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.aqoursMembersService.remove(id);
    }
}
