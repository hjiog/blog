---
title: 设计模式学习笔记
date: 2020-03-19
tags:
 - 设计模式
categories:
 - 其他
---

## 访问者模式

### 定义

平时我们定义完一个类之后，这个类所能执行的逻辑就是确定的了，但是我们经常会遇到一种场景: 根据外部环境更改这个类所能执行的行为。

<!-- more -->

而 **访问者模式** 就是在不更改这个类的前提下，更改这个类中方法所能执行的逻辑。

### 流程

1. 从结构容器中取出元素
2. 创建一个访问者
3. 将访问者载入传入的元素（即让访问者访问元素）
4. 获取输出

### 一般写法

```go
type EnvExample struct {}
func (e EnvExample) Print() {
     if GetEnv() == "testing" {
         fmt.Println("这是测试环境")
     }
     if GetEnv() == "production" {
         fmt.Println("这是生产环境")
     }
}
//这样这个Print() 方法的逻辑就耦合在当前结构体中了，扩展性差，现在假如我们要添加一个打印 这是本地环境 的逻辑呢？

//我们就需要更改Print() 方法了，注意! 这是一个非常简单的例子，可以随意更改Print() 方法，没什么关系，但是在实际开发过程中

//一个函数的实现是十分复杂的，有可能更改了这个方法，会导致整个系统崩溃，所以解耦是一个十分迫切的需要.
```

### 使用访问者模式

```go
// 定义访问者接口
type IVisitor interface {
Visit() // 访问者的访问方法
}

// 实现该接口
type ProductionVisitor struct {
}

func (v ProductionVisitor) Visit() {
    fmt.Println("这是生产环境")
}

type TestingVisitor struct {
}

func (t TestingVisitor) Visit() {
    fmt.Println("这是测试环境")
}

// 定义元素接口
type IElement interface {
Accept(visitor IVisitor)
}

// 实现元素接口
type Element struct {}
func (el Element) Accept(visitor IVisitor) {
    visitor.Visit()
}

// 修改 Print() 方法
type EnvExample struct {
         Element
}
func (e EnvExample) Print(visitor IVisitor) {
    e.Element.Accept(visitor)
}

 // 开始调用
 // 创建一个元素
e := new(Element)
e.Accept(new(ProductionVisitor)) // output: 这是生产环境
e.Accept(new(TestingVisitor))    // output: 这是测试环境
m := new(EnvExample)
m.Print(new(ProductionVisitor))
m.Print(new(TestingVisitor))
```

### 总结

visit() 接口是自定义的方法，可随时增删改，由accept()接口实现，从而使得每个visit像访问者一样自由，而不必限制死只能一个客人（方法）。特点：以函数作为参数实现函数可配置。
