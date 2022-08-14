---
title: JavaScript 反射元编程
date: 2022-08-12 17:19:24
tags: [Typescript]
categories: [JavaScript]
---

### 概念

#### 什么是反射？

> 在[计算机学](https://zh.wikipedia.org/wiki/計算機學)中，**反射式编程**（英语：reflective programming）或**反射**（英语：reflection），是指[计算机程序](https://zh.wikipedia.org/wiki/计算机程序)在[运行时](https://zh.wikipedia.org/wiki/运行时)（runtime）可以访问、检测和修改它本身状态或行为的一种能力。[[1\]](https://zh.wikipedia.org/wiki/反射式编程#cite_note-Forman_p8-1)用比喻来说，反射就是程序在运行的时候能够“观察”并且修改自己的行为。
>
> -- 来自维基百科

反射就是指程序运行阶段(RunTime)拦截程序，以达到获取、修改自身元数据的目的。这在其他高级语言中是非常常见的概念。

在*JavaScript* 这种动态语言中，反射可以说是无处不在。

我们随时可以去新增、修改对象的属性，甚至可以重新定义对象中的方法，如我们日常使用的 apply 、 defineProperty 操作就属于典型的反射。

<!-- more -->

#### 什么是元数据？

元数据可以理解为：**描述数据的数据**。

比如现在有一个类，那么类里面的属性是描述这个类的数据。

描述属性的数据就可以理解为元数据，如属性的类型、方法属性的返回值等。



### Reflect API

Reflect 是 JavaScript 的一个 API，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)。

它封装了一系列对对象底层静态操作方法，重新实现了类似 `Object.defineProperty`、`Object.apply` 等函数。

#### 为什么需要Reflect

理解了上面反射的概念后，有人不禁有些疑惑。运行时改变数据？这对JavaScript 来说不是很正常的事情吗？ 毕竟JavaScript 本身就是 runtime 的语言啊，像：

```javascript
const a = document.querySelectorAll('a')

Array.prototype.slice.apply(a).forEach(item => {...})
```

这不就是一个标准的反射吗？ 除了有点难记之外，好像也没啥不对的地方。

看一下 Reflect 的写法：

```typescript
const a = document.querySelectorAll('a')

Reflect.apply(Array, Array, a).forEach(item => {...})
```

嚯~，好像规整了很多。

**Reflect 存在的意义就是规整反射API**，将这些API 放到一个对象中统一管理。

#### 现阶段Reflect 实现的API

1. [`Reflect.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)
2. [`Reflect.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)
3. [`Reflect.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)
4. [`Reflect.deleteProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty)
5. [`Reflect.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)
6. [`Reflect.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)
7. [`Reflect.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf)
8. [`Reflect.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)
9. [`Reflect.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)
10. [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
11. [`Reflect.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions)
12. [`Reflect.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)
13. [`Reflect.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)

很眼熟吧... 很多都是原有方法的重新实现。



### Reflect Metadata

Reflect API 对元数据的操作并不完善，因此 ES7 的规范额外提案了一些对 MetaData 操作。

不过目前浏览器兼容并不好， 我们可以通过 reflect-metadata 库来做 polyfill。

```
npm i reflect-metadata -s
```

`reflect-metadata` 并没有导出任何模块， 所以直接在程序入口引用即可。

```typescript
import 'reflect-metadata';
```

#### 获取预设元信息

Reflect Matedata 默认预设了几个 `metadataKey`,分别用于获取目标的类型、接受的参数类型、返回的结果类型。

- design:type
- design:paramtypes
- design:returntype

```typescript
function Prop(options: { default: string }) {
  return (target: any, key: string) => {
    console.log(Reflect.getMetadata("design:type", target, key).name); // String
  };
}

function Method(target: any, key: string) {
  const types = Reflect.getMetadata("design:paramtypes", target, key);
  const s = types.map((a: any) => a ? a.name : "undefined").join(",");
  console.log(`${key} param types: ${s}`); // onClick param types: String,Number

  const returnType = Reflect.getMetadata("design:returntype", target, key); // onClick return types: Promise

  console.log(`${key} return types: ${returnType.name}`);
}

class Test {
  @Prop()
  public AProp!: string;

  @Method
  onClick(type: string, num: number): Promise<number> {
    return new Promise<number>(resolve => 1)
  }
}
```



#### 快速添加元数据

Reflect MetaData 是可以直接作为装饰器使用的，可以快捷的添加元数据。

```typescript
@Reflect.metadata('custom:name', 'a custom class')
class Vue {
  @Reflect.metadata('custom:name', 'a custom prop')
  public AProp!: string;
}

const vm = new Vue();

console.log(Reflect.getMetadata('custom:name', Vue)) // a custom class
console.log(Reflect.getMetadata('custom:name', vm, 'AProp')) // a custom prop
```

注意：

*自属性上获取元数据的时候，第二个参数需要是一个实例，而非是原始 class 本身。*



#### 自定义元数据

除了上面讲 Reflect Metadata 当做装饰器的用法外， Reflect 还暴露了一些控制 metadata 的方法.

如通过 defineMetadata 在自定义装饰器内部去操作 metadata

```typescript
Reflect.defineMetadata("defaultValue", 'custom:name', target, key);
```



### 业务用途

元数据的操作略微有点偏底层，一般常用在框架级的底层设计中。

如深度Angular 的依赖注入、控制反转；Vue Class Template 的模型注册、属性收集等。

我们来尝试设计一个简单的 Vue  @Props 装饰器，来达到设置 prop 默认值的效果：

```typescript
// APP 启动器
function bootstrap(vm: Vue) {
  // 读取元信息
  for (const prop in vm) {
    // 读取元信息
    const defaultValue = Reflect.getMetadata("defaultValue", vm, prop);

    // 为 props 添加原始值
    Reflect.set(vm, prop, defaultValue);
  }
  
  return vm;
}

function Prop(options: { default: string }) {
  return (target: any, key: string) => {
    Reflect.defineMetadata("defaultValue", options.default, target, key);
  };
}

class Vue {
  @Prop({
    default: "zhukejin"
  })
  public AProp!: string;
}

// 通过App 启动器启动程序
const app = bootstrap(new Vue());

console.log(app) // Vue {AProp: 'zhukejin'}
```

喏 👆🏻。。 默认值已经添加进去了，同样的道理，我们可以通过 metadata 来标记元素，来达到收集、处理的目的。



### 常见问题

1. **Reflect.getMetadata 获取到是 undefined**

   需要在 tsconfig.json 中开启配置

   ```json
   "experimentalDecorators": true,
   "emitDecoratorMetadata": true,
   ```

