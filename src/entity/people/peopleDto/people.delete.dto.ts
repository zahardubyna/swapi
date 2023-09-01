import { ApiProperty } from '@nestjs/swagger';

export class PeopleDeleteDto {
  @ApiProperty({ example: 0 })
  id: number;
}
