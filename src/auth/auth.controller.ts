import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guards/jwt-guard';
import { GetUserFromRequest } from '../decorators/user.decorator';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { assignWith } from 'lodash';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authServices.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authServices.login(dto);
    await this.authServices.saveCookie(response, tokens);
    return tokens;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUserFromRequest() { sub },
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authServices.deleteCookie(response);
    return this.authServices.logout(sub);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authServices.refreshTokens(
      req.cookies.refresh_token,
    );

    await this.authServices.saveCookie(response, tokens);

    return tokens;
  }
}
