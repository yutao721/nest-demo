export { };


// 返回3个参数
// 1.原形对象
// 2.方法的名称
// 3.参数的位置从0开始
const currency: ParameterDecorator = (target: any, key: string | symbol, index: number) => {
  console.log(target, key, index)
}


class Xiaoman {
  public name: string
  constructor() {
    this.name = ''
  }
  getName(name: string, @currency age: number) {
    return this.name
  }
}
