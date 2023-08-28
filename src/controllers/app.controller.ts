import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppGetController {
  constructor(private readonly AppServices: AppService) {}
  @Get()
  getHello(): string {
    return this.AppServices.getHello();
  }
}

@Controller(['user', 'users'])
export class AppController {
  constructor(private readonly AppServices: AppService) {}
  @Get()
  getHello(): string {
    return this.AppServices.getAllAboba();
  }
  @Post(':id')
  getAbobaId(@Param() params): string {
    return this.AppServices.getOneAboba(params.id);
  }
}
