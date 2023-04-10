
// 根模块，用于其他模块的引用和共享

import { Module } from '@nestjs/common';
// 常见功能是用来处理 http 请求以及调用 service 层的处理方法
import { AppController } from './app.controller';
// 封装通用的业务逻辑、与数据层的交互(例如数据库)、其他额外的第三方请求
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DemoModule, UserModule],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule { }
