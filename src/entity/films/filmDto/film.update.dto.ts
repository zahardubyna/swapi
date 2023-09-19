import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FilmUpdateDto {
  @ApiProperty({ type: 'string', example: 'A New Hope' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'number', example: 4 })
  @IsNumber()
  episode_id: number;

  @ApiProperty({ type: 'string', example: 'It is a period of civil war ...' })
  @IsString()
  opening_crawl: string;

  @ApiProperty({ type: 'string', example: 'George Lucas' })
  @IsString()
  director: string;

  @ApiProperty({ type: 'string', example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  producer: string;

  @ApiProperty({ type: 'string', example: '1977-05-25' })
  @IsString()
  release_date: string;

  @ApiProperty({ type: 'string', example: '2014-12-10T14:23:31.880000Z' })
  @IsString()
  created: string;

  @ApiProperty({ type: 'string', example: '2014-12-20T19:49:45.256000Z' })
  @IsString()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
