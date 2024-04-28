import { Module } from '@nestjs/common';
import { AqoursMembersService } from './aqours_members.service';
import { AqoursMembersController } from './aqours_members.controller';

@Module({
  controllers: [AqoursMembersController],
  providers: [AqoursMembersService],
})
export class AqoursMembersModule {}
