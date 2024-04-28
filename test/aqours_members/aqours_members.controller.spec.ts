import { Test, TestingModule } from '@nestjs/testing';
import { AqoursMembersController } from '../../src/modules/aqours_members/aqours_members.controller';
import { AqoursMembersService } from '../../src/modules/aqours_members/aqours_members.service';

describe('AqoursMembersController', () => {
    let controller: AqoursMembersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AqoursMembersController],
            providers: [AqoursMembersService],
        }).compile();

        controller = module.get<AqoursMembersController>(AqoursMembersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
