import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World！！！!';
  }
  getYutao(): string {
    return 'Hello World, yutao';
  }
}
