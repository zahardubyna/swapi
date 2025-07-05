import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { UserCreateDto } from '@users/dto/user.create.dto';
import { UsePermissionsGuard } from '@casl/guards/permission.guard';
import { Actions } from '@casl/actions.enum';
import { ApiBaseResponses } from '../common/decorators/api-base-response.decorator';
import { GetUserFromRequest } from '../common/decorators/user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@ApiBaseResponses()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePermissionsGuard(Actions.create, UserEntity)
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() dto: UserCreateDto) {
    return this.usersService.create(dto);
  }

  @Get('me')
  @UsePermissionsGuard(Actions.get, UserEntity)
  @ApiOperation({ summary: 'Get my users' })
  @ApiOkResponse({ type: UserEntity })
  getMe(@GetUserFromRequest() { id }) {
    return this.usersService.getOneById(id);
  }
}
