(window.webpackJsonp=window.webpackJsonp||[]).push([[165],{841:function(n,t){n.exports="### 状态模式\n\n状态模式: 将事物内部的每个状态分别封装成类, 内部状态改变会产生不同行为。\n\n优点: 用对象代替字符串记录当前状态, 状态易维护\n\n缺点: 需编写大量状态类对象\n\n### 场景 demo\n\n某某牌电灯, 按一下按钮打开弱光, 按两下按钮打开强光, 按三下按钮关闭灯光。\n\n```js\n// 将状态封装成不同类\nconst weakLight = function(light) {\n  this.light = light\n}\n\nweakLight.prototype.press = function() {\n  console.log('打开强光')\n  this.light.setState(this.light.strongLight)\n}\n\nconst strongLight = function(light) {\n  this.light = light\n}\n\nstrongLight.prototype.press = function() {\n  console.log('关灯')\n  this.light.setState(this.light.offLight)\n}\n\nconst offLight = function(light) {\n  this.light = light\n}\n\noffLight.prototype.press = function() {\n  console.log('打开弱光')\n  this.light.setState(this.light.weakLight)\n}\n\nconst Light = function() {\n  this.weakLight = new weakLight(this)\n  this.strongLight = new strongLight(this)\n  this.offLight = new offLight(this)\n  this.currentState = this.offLight          // 初始状态\n}\n\nLight.prototype.init = function() {\n  const btn = document.createElement('button')\n  btn.innerHTML = '按钮'\n  document.body.append(btn)\n  const self = this\n  btn.addEventListener('click', function() {\n    self.currentState.press()\n  })\n}\n\nLight.prototype.setState = function(state) { // 改变当前状态\n  this.currentState = state\n}\n\nconst light = new Light()\nlight.init()\n\n// 打开弱光\n// 打开强光\n// 关灯\n```\n\n### 非面向对象实现的状态模式\n\n借助于 JavaScript 的委托机制, 可以像如下实现状态模式:\n\n```js\nconst obj = {\n  'weakLight': {\n    press: function() {\n      console.log('打开强光')\n      this.currentState = obj.strongLight\n    }\n  },\n  'strongLight': {\n    press: function() {\n      console.log('关灯')\n      this.currentState = obj.offLight\n    }\n  },\n  'offLight': {\n    press: function() {\n      console.log('打开弱光')\n      this.currentState = obj.weakLight\n    }\n  },\n}\n\nconst Light = function() {\n  this.currentState = obj.offLight\n}\n\nLight.prototype.init = function() {\n  const btn = document.createElement('button')\n  btn.innerHTML = '按钮'\n  document.body.append(btn)\n  const self = this\n  btn.addEventListener('click', function() {\n    self.currentState.press.call(self) // 通过 call 完成委托\n  })\n}\n\nconst light = new Light()\nlight.init()\n```"}}]);