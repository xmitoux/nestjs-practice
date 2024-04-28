import { Module } from '@nestjs/common';

import { AqoursMembersController } from './aqours_members.controller';
import { AqoursMembersService } from './aqours_members.service';

@Module({
    controllers: [AqoursMembersController],
    providers: [AqoursMembersService],
})
export class AqoursMembersModule {}
