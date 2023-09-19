import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FilmCreateDto {
  @ApiProperty({ example: 'A New Hope' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'number', example: 4 })
  @IsNumber()
  episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war ...' })
  @IsString()
  opening_crawl: string;

  @ApiProperty({ example: 'George Lucas' })
  @IsString()
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @IsString()
  release_date: string;

  @ApiProperty({ example: '2014-12-10T14:23:31.880000Z' })
  @IsString()
  created: string;

  @ApiProperty({ example: '2014-12-20T19:49:45.256000Z' })
  @IsString()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
