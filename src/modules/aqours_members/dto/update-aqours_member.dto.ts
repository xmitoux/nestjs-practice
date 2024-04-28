import { PartialType } from '@nestjs/mapped-types';

import { CreateAqoursMemberDto } from './create-aqours_member.dto';

export class UpdateAqoursMemberDto extends PartialType(CreateAqoursMemberDto) {}
