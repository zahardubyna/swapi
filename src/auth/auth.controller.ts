import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authServices.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authServices.login(dto);
  }
}
