import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AqoursMembersModule } from '@/modules/aqours_members/aqours_members.module';

@Module({
    controllers: [AppController],
    imports: [AqoursMembersModule],
    providers: [AppService],
})
export class AppModule {}
