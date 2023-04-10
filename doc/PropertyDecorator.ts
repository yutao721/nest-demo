export { }

// 属性装饰器
// 返回2个参数 
// 原形对象 
// 属性的名称

const currency: PropertyDecorator = (target: any, key: string | symbol) => {
  console.log(target, key)
}


class Xiaoman {
  @currency
  public name: string
  public age: number
  constructor() {
    this.name = ''
  }
  getName() {
    return this.name
  }
}

