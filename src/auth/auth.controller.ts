import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SkipAuth } from './skip.auth';
import { Throttle } from '@nestjs/throttler';
import { GetUserFromRequest } from '../common/decorators/user.decorator';
import {
  ApiBaseBadRequestResponse, ApiBaseForbiddenResponse,
  ApiBaseInternalServerErrorResponse,
  ApiBaseUnauthorizedResponse,
} from '../common/decorators/api-base-response.decorator';
import { GetAccessToken } from '../common/decorators/get-access-token.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('register')
  @SkipAuth()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiBaseBadRequestResponse()
  @ApiBaseInternalServerErrorResponse()
  async register(@Body() dto: RegisterDto) {
    return this.authServices.register(dto);
  }

  @Post('login')
  @SkipAuth()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiBaseBadRequestResponse()
  @ApiBaseUnauthorizedResponse()
  @ApiBaseInternalServerErrorResponse()
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authServices.login(dto, req.cookies?.refresh_token);
    await this.authServices.saveCookie(response, tokens);
    return tokens;
  }

  @ApiBearerAuth()
  @Post('logout')
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiBaseBadRequestResponse()
  @ApiBaseUnauthorizedResponse()
  @ApiBaseForbiddenResponse()
  @ApiBaseInternalServerErrorResponse()
  async logout(
    @GetUserFromRequest() { id },
    @GetAccessToken() access_token: string,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authServices.deleteCookie(response);
    return this.authServices.logout(id, access_token, req.cookies?.refresh_token);
  }

  @Post('refresh')
  @SkipAuth()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiBaseUnauthorizedResponse()
  @ApiBaseForbiddenResponse()
  @ApiBaseInternalServerErrorResponse()
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authServices.refreshTokens(
      req.cookies?.refresh_token,
    );

    await this.authServices.saveCookie(response, tokens);

    return tokens;
  }
}
