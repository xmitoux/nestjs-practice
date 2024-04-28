import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AqoursMembersService } from './aqours_members.service';
import { CreateAqoursMemberDto } from './dto/create-aqours_member.dto';
import { UpdateAqoursMemberDto } from './dto/update-aqours_member.dto';
import { Response } from 'express';

@Controller('aqours-members')
export class AqoursMembersController {
    constructor(private readonly aqoursMembersService: AqoursMembersService) {}

    @Post()
    create(@Body() createAqoursMemberDto: CreateAqoursMemberDto, @Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.CREATED);
        return this.aqoursMembersService.create(createAqoursMemberDto);
    }

    @Get()
    findAll(@Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.OK);
        return this.aqoursMembersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.aqoursMembersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAqoursMemberDto: UpdateAqoursMemberDto) {
        return this.aqoursMembersService.update(+id, updateAqoursMemberDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.aqoursMembersService.remove(+id);
    }
}
