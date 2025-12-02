import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './common/response';
import { httpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//全局中间件只能使用函数模式 案例可以做白名单拦截之类的

const whiteList = ['/list'];
function middleWareAll(req, res, next) {
  console.log(req.originalUrl, '我收全局的');
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({ msg: '小黑子露出鸡脚了吧' });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 注册全局响应拦截器
  app.useGlobalInterceptors(new Response());
  // 注册全局异常过滤器
  // app.useGlobalFilters(new httpFilter())
  // 静态目录访问
  app.useStaticAssets(join(__dirname, '../images'), {
    prefix: '/images',
  });
  app.useGlobalPipes(new ValidationPipe());
  // 使用第三方中间件
  // app.use(cors());
  // 使用全局中间件
  // app.use(middleWareAll)
  // 开启版本控制
  // app.enableVersioning({
  //   type: VersioningType.URI
  // })
  // 使用session
  app.use(
    session({
      secret: 'XiaoMan',
      name: 'xm.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 允许跨域
  // app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述，。。。')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(5000);
}
bootstrap();
