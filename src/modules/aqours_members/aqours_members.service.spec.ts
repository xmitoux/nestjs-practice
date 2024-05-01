import { Test, TestingModule } from '@nestjs/testing';

import { AqoursMembersService } from './aqours_members.service';

describe('AqoursMembersService', () => {
    let service: AqoursMembersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AqoursMembersService],
        }).compile();

        service = module.get<AqoursMembersService>(AqoursMembersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
