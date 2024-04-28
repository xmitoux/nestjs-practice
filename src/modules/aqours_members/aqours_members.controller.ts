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
import { AqoursMembersService } from './aqours_members.service';
import { CreateAqoursMemberDto } from './dto/create-aqours_member.dto';
import { UpdateAqoursMemberDto } from './dto/update-aqours_member.dto';
import { Response } from 'express';
import { Query } from '@nestjs/common/decorators';
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
    findAll(@Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.OK);
        return this.aqoursMembersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.aqoursMembersService.findOne(+id);
    }

    @Get()
    findByIds(
        @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
        ids: number[],
    ): AqoursMember[] {
        return this.aqoursMembersService.findByIds(ids);
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
