import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  // 依赖注入 AppService
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getYutao();
  }
}
