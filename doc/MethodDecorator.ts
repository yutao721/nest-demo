export { }
// 返回3个参数
// 1.原型对象
// 2.方法的名称
// 3.属性描述符  可写对应writable，可枚举对应enumerable，可配置对应configurable
const currency: MethodDecorator = (target: any, key: string | symbol, descriptor: any) => {
  console.log(target, key, descriptor)
}


class Xiaoman {
  public name: string
  constructor() {
    this.name = ''
  }
  @currency
  getName(name: string, age: number) {
    return this.name
  }
}

