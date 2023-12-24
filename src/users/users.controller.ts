import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles-guard';
import { JwtGuard } from '../auth/guards/jwt-guard';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('get/all')
  @Roles(Role.Admin)
  getAll() {
    return this.usersService.getAll();
  }
  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.usersService.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneById(id);
  }

  @ApiBearerAuth()
  @Get('get/:username')
  @Roles(Role.Admin)
  @ApiParam({ name: 'username' })
  getOneByUsername(@Param('username', ParseIntPipe) username: string) {
    return this.usersService.getOneByUsername(username);
  }

  // @ApiBearerAuth()
  // @Post('create')
  // @Roles(Role.Admin)
  // getCreate(@Body() body: PeopleCreateDto) {
  //   return this.usersService.create();
  // }
  //
  // @ApiBearerAuth()
  // @Put('update/:id')
  // @Roles(Role.Admin)
  // @UseInterceptors(FilesInterceptor('files'))
  // @ApiConsumes('multipart/form-data')
  // @ApiParam({ name: 'id' })
  // getUpdate(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() body: PeopleUpdateDto,
  //   @UploadedFiles() files: Express.Multer.File[],
  // ) {
  //   return this.peopleServices.updatePeople(body, files, id);
  // }
}
