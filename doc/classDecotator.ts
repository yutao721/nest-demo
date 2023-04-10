
// 类装饰器
// 他会自动把class的构造函数传入到装饰器的第一个参数 target
// 然后通过prototype可以自定义添加属性和方法

export { }

const decotators: ClassDecorator = function (target: any) {
  console.log(target)
  // 添加属性
  target.prototype.name = 'tty';
  // 添加方法
  target.prototype.say = function () {
    console.log(`my name is ${this.name}`)
  }
}

@decotators
class Xiaoman {
  constructor() {

  }

}

const xiaoman: any = new Xiaoman()
console.log(xiaoman.name)
xiaoman.say();