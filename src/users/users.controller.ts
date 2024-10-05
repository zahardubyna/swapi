import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { UserCreateDto } from '@users/dto/user.create.dto';
import { UsePermissionsGuard } from '@casl/guards/permission.guard';
import { UserActions } from './users.permissions';
import { ApiBaseResponse } from '@decorators/api-base-response.decorator';
import { GetUserFromRequest } from '@decorators/user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@ApiBaseResponse()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePermissionsGuard(UserActions.create, UserEntity)
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() dto: UserCreateDto) {
    return this.usersService.create(dto);
  }

  @Get('me')
  @UsePermissionsGuard(UserActions.getMe, UserEntity)
  @ApiOperation({ summary: 'Get my users' })
  @ApiOkResponse({ type: UserEntity })
  getMe(@GetUserFromRequest() { id }) {
    return this.usersService.getOneById(id);
  }

  @Get(':id')
  @UsePermissionsGuard(UserActions.getById, UserEntity)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ name: 'id' })
  getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneById(id);
  }

  // @Get()
  // @UsePermissionsGuard(UserActions.get, UserEntity)
  // @ApiOperation({ summary: 'Get user by username' })
  // @ApiOkResponse({ type: UserEntity })
  // getOneByUsername(@Param('username') username: string) {
  //   console.log(username);
  // return this.usersService.getOneByUsername(username);
  // }
}
