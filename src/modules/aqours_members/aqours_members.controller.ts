import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    ParseIntPipe,
    ParseArrayPipe,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Response } from 'express';

import { AqoursMembersService } from './aqours_members.service';
import { CreateAqoursMemberDto } from './dto/create-aqours_member.dto';
import { UpdateAqoursMemberDto } from './dto/update-aqours_member.dto';
import { AqoursMember } from './entities/aqours_member.entity';

@Controller('aqours-members')
export class AqoursMembersController {
    constructor(private readonly aqoursMembersService: AqoursMembersService) {}

    @Post()
    create(@Body() createAqoursMemberDto: CreateAqoursMemberDto, @Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.CREATED);
        return this.aqoursMembersService.create(createAqoursMemberDto);
    }

    @Post('bulk')
    createBulk(
        @Body(new ParseArrayPipe({ items: CreateAqoursMemberDto }))
        createAqoursMemberDtos: CreateAqoursMemberDto[],
        @Res({ passthrough: true }) res: Response,
    ) {
        res.status(HttpStatus.CREATED);
        return this.aqoursMembersService.createBulk(createAqoursMemberDtos);
    }

    @Get()
    findAll(@Res({ passthrough: true }) res: Response): AqoursMember[] {
        res.status(HttpStatus.OK);
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
    findOne(@Param('id', ParseIntPipe) id: string): AqoursMember | undefined {
        const member = this.aqoursMembersService.findOne(+id);
        return member;
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() updateAqoursMemberDto: UpdateAqoursMemberDto) {
        return this.aqoursMembersService.update(+id, updateAqoursMemberDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.aqoursMembersService.remove(+id);
    }
}
