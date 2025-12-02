import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  // 依赖注入 AppService
  constructor(
    @Inject('ABC') private readonly appService: AppService,
    @Inject('JD') private shopList: string[],
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getYutao() + this.shopList;
  }
}
