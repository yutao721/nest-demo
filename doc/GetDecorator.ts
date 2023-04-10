
export { }

import axios from 'axios';

// 实际就是一个柯理化函数
const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    // 实际需要执行的函数
    const fnc = descriptor.value;
    axios.get(url).then(res => {
      fnc(res, {
        status: 200
      })
    }).catch(e => {
      fnc(e, {
        status: 500
      })
    })
  }
}

// 自定义一个get装饰器

class Controller {
  constructor() {

  }
  
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(res, status) {
    console.log(res.data.result.list, status)
  }
}






