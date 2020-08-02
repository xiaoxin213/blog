(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{813:function(n,e){n.exports="随着 ES6 和 TypeScript 中类的引入, 在某些场景需要在不改变原有类和类属性的基础上扩展些功能, 这也是装饰器出现的原因。\n\n\x3c!--more--\x3e\n\n### 装饰器简介\n\n作为一种可以动态增删功能模块的模式(比如 [redux 的中间件机制](https://github.com/MuYunyun/blog/issues/15)), 装饰器同样具有很强的动态灵活性, 只需在类或类属性之前加上 `@方法名` 就完成了相应的类或类方法功能的变化。\n\n不过装饰器模式仍处于[第 2 阶段提案中](https://github.com/tc39/proposal-decorators), 使用它之前需要使用 babel 模块 `transform-decorators-legacy` 编译成 ES5 或 ES6。\n\n在 TypeScript 的 [lib.es5.d.ts](https://github.com/Microsoft/TypeScript/blob/c48662c891ce810f5627a0f6a8594049cccceeb5/lib/lib.es5.d.ts#L1291) 中, 定义了 4 种不同装饰器的接口:\n\n```ts\ndeclare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;\ndeclare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;\ndeclare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;\ndeclare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;\n```\n\n下面对装饰类以及装饰类方法进行解析。\n\n### 作用于类的装饰器\n\n当装饰的对象是类时, 我们操作的就是这个`类本身`。\n\n```js\n@log\nclass MyClass { }\n\nfunction log(target) { // 这个 target 在这里就是 MyClass 这个类\n   target.prototype.logger = () => `${target.name} 被调用`\n}\n\nconst test = new MyClass()\ntest.logger() // MyClass 被调用\n```\n\n由于装饰器是表达式, 我们也可以在装饰器后面再添加提个参数:\n\n```js\n@log('hello')\nclass MyClass { }\n\nfunction log(text) {\n  return function(target) {\n    target.prototype.logger = () => `${text}, ${target.name} 被调用`\n  }\n}\n\nconst test = new MyClass()\ntest.logger() // hello, MyClass 被调用\n```\n\n在使用 redux 中, 我们最常使用 react-redux 的写法如下:\n\n```js\n@connect(mapStateToProps, mapDispatchToProps)\nexport default class MyComponent extends React.Component {}\n```\n\n经过上述分析, 我们知道了上述写法等价于下面这种写法:\n\n```js\nclass MyComponent extends React.Component {}\nexport default connect(mapStateToProps, mapDispatchToProps)(MyComponent)\n```\n\n### 作用于类方法的装饰器\n\n与装饰类不同, 对类方法的装饰本质是操作其描述符。可以把此时的装饰器理解成是 `Object.defineProperty(obj, prop, descriptor)` 的语法糖, 看如下代码:\n\n```js\nclass C {\n  @readonly(false)\n  method() { console.log('cat') }\n}\n\nfunction readonly(value) {\n  return function (target, key, descriptor) { // 此处 target 为 C.prototype; key 为 method;\n    // 原 descriptor 为: { value: f, enumarable: false, writable: true, configurable: true }\n    descriptor.writable = value\n    return descriptor\n  }\n}\n\nconst c = new C()\nc.method = () => console.log('dog')\n\nc.method() // cat\n```\n\n可以看到装饰器函数接收的三个参数与 Object.defineProperty 是完全一样的, 具体实现可以看 babel 转化后的代码, 主要实现如下所示:\n\n```js\nvar C = (function() {\n  class C {\n    method() { console.log('cat') }\n  }\n\n  var temp\n  temp = readonly(false)(C.prototype, 'method',\n    temp = Object.getOwnPropertyDescriptor(C.prototype, 'method')) || temp // 通过 Object.getOwnPropertyDescriptor 获取到描述符传入到装饰器函数中\n\n  if (temp) Object.defineProperty(C.prototype, 'method', temp)\n  return C\n})()\n```\n\n再将再来看看如果有多个装饰器作用于同一个方法上呢？\n\n```js\nclass C {\n  @readonly(false)\n  @log\n  method() { }\n}\n```\n\n经 babel 转化后的代码如下:\n\n```js\ndesc = [readonly(false), log]\n    .slice()\n    .reverse()\n    .reduce(function(desc, decorator) {\n      return decorator(target, property, desc) || desc;\n    }, desc);\n```\n\n可以清晰地看出, 经过 reverse 倒序后, 装饰器方法会至里向外执行。\n\n### 相关链接\n\n[javascript-decorators](https://github.com/wycats/javascript-decorators)\n[Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html)\n[JS 装饰器（Decorator）场景实战](https://juejin.im/post/59f1c484f265da431c6f8940)\n[修饰器](http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0)\n[Babel](http://babeljs.io)\n"}}]);