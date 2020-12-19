---
title: angular 学习笔记
date: 2020-03-19
tags:
 - angular
categories:
 - 前端
---

## angular 问题记录

### 命名问题：


```html
// 以下写法会出现NaN，在ngfor中不能用address-type命名
<select class='form-control' (change)='onChangeType(selectTop.value)' [value]='addressType[0]' #selectTop>
        <option *ngFor="let address-type of addressType" value="{{address-type}}">{{item}}</option>
</select>

// 以下是正确写法
<select class='form-control' (change)='onChangeType(selectTop.value)' [value]='addressType[0]' #selectTop>
        <option *ngFor="let item of addressType" value="{{item}}">{{item}}</option>
</select>
```



<!-- more -->

--------------

### 操作dom元素

> 官方的说法是： 不推荐使用ElementRef来改变元素的样式属性值或者操作DOM元素，原因是，angular是一个跨平台的框架，如果直接使用ElementRef对DOM直接进行操作，那么在其他平台情况下会出事。那么真的的正规操作DOM是使用什么呢？ 官方推荐： 仅使用render2来改变DOM元素的样式，仅使用viewContentRef来改变DOM的结构，不推荐使用render2来改变DOM结构，因为使用render2操作DOM结构，只是将DOM的标签移除，但是在视图中的标签view并没有被真的移除。

- render2用法：[参考](https://www.cnblogs.com/timetimetime/p/9259145.html)

  - 官方api:

  ```js
  abstract class Renderer2 {
    abstract data: {...}
    destroyNode: ((node: any) => void) | null
    abstract destroy(): void
    abstract createElement(name: string, namespace?: string): any
    abstract createComment(value: string): any
    abstract createText(value: string): any
    abstract appendChild(parent: any, newChild: any): void
    abstract insertBefore(parent: any, newChild: any, refChild: any): void
    abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void
    abstract selectRootElement(selectorOrNode: any, preserveContent?: boolean): any
    abstract parentNode(node: any): any
    abstract nextSibling(node: any): any
    abstract setAttribute(el: any, name: string, value: string, namespace?: string): void
    abstract removeAttribute(el: any, name: string, namespace?: string): void
    abstract addClass(el: any, name: string): void
    abstract removeClass(el: any, name: string): void
    abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void
    abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void
    abstract setProperty(el: any, name: string, value: any): void
    abstract setValue(node: any, value: string): void
    abstract listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void
  }
  ```

  - html

  ```html
  <div #targetDiv>targerDiv</div>
  <div class="btn">targerDiv</div>
  ```

  - ts

  ```js
  @ViewChild('targetDiv') targetDiv: ElementRef;
   constructor(
       private _render: Renderer2,
       private el: ElementRef,
   ) { }
  ngAfterViewInit(): void {
      	 this.el.nativeElement.querySelectorAll('.btn').forEach(element =>{
      		element.style.height = '300px';
      	})
          this._render.setStyle(this.targetDiv.nativeElement, 'background', 'pink');
      }
  ```

- viewContentRef 用法：

  >  背景知识介绍：
  >
  > viewContentRef引用\<ng-container>标签，\<ng-container>是angular里的一种映射，在没有真的内容出现的时候，\<ng-container>只是一个隐式的占位符，最后动态生成的元素会被填充到这个占位符中，由viewContentRef的实例使用自带的API来创建元素，元素应该是一开始就写好的，但是其DOM结果没有被渲染出来，在angular中\<ng-template>中的内容会被忽略，我们需要做的是创建\<ng-tempate>的引用，然后给到viewContentRef的实例\<ng-tempate>中的元素自然会被显示出来

  >  创建元素:

  - html

  ```html
  <ng-template><a>i am a to removed</a></ng-template>
  <ng-container #vc></ng-container>
  <button (click)="remove()">remove</button>
  <button (click)="create()">create</button>
  ```

  - ts

  ```js
  export class ViewContentRefComponent implements OnInit, AfterViewInit {
      @ViewChild(TemplateRef) template;
      @ViewChild('vc', {read: ViewContainerRef}) vc;
      constructor() { }

      ngOnInit() {
          console.log(this.template);
          console.log(this.vc);
      }

      ngAfterViewInit(): void {
          this.vc.createEmbeddedView(this.template);
      }

      remove = () => {
          this.vc.remove();
      }

      create = () => {
          this.vc.createEmbeddedView(this.template);
      }
  }
  ```

  >  创建组件

  >总思路：
  >
  >  创建一个组件；然后再要创建组件的另外一个组建中引用ViewContainerRef，将工厂解析器解析之后的组件（被创建的组件）ViewContainerRef的创建组件函数中即可

  - alerComponent.html

  ```html
  <p>name: {{name}}</p>
  <p>age: {{age}}</p>
  ```

  - alerComponent.ts

  ```js
    export class AlertComponent implements OnInit {
      @Input() name = '';
    @Input() age = 0;
      constructor() { }

      ngOnInit() {
    }
  }
  ```

  - createAlert.html

  ```html
  <ng-template #contatiner></ng-template>
  <button (click)="create()">create alter component</button>
  <button (click)="remove()">remove component</button>
  ```

  - createAlert.componts.ts

  ```js
    export class CreateAlertComponent implements OnInit {
      @ViewChild('contatiner', {read: ViewContainerRef}) contatiner;
      alertComponent: ComponentRef<any>;
      constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

      ngOnInit() {
      }

      create = (): void => {
          this.contatiner.clear();
          this.alertComponent = this.contatiner.createComponent(this.componentFactoryResolver.resolveComponentFactory(AlertComponent));
          this.alertComponent.instance.name = 'lili';
          this.alertComponent.instance.age = 12;
      }

      remove = (): void => {
          // 被创建的组件进行自我销毁
          this.alertComponent.destroy();
      }

  }
  ```







---------

### 非父子组件方法调用

 **componentOne**

```js
  ngOnInit() {}

  public testCall(){
    alert("I am here..");
  }
```

**componentTwo**

```js
import { oneComponent } from '../one.component';


@Component({
  providers:[oneComponent ], // 不要忘了这步
  selector: 'app-two',
  templateUrl: ...
}


constructor(private comp: oneComponent ) { }

public callMe(): void {
    this.comp.testCall();
  }
```







-----------

### ngFor用法技巧

```html
<ul>
    <li *ngFor="let name of users1; let i = index; let c = count;
                let i = index;let o = odd; let e = even;">
        {{i + 1}}: {{name}}
    </li>
</ul>
```

迭代属性共包括：

- `index: number`：当前索引号
- `count:number` : 当前项的长度
- `first: boolean`：是否第一次
- `last: boolean`：是否最后一次
- `even: boolean`：是否偶数
- `odd: boolean`：是否奇数

> 高级用法 ：async

当在使用一个 `let subResult = Observable.subscribe` 时，与之相对应的，应该会有这样的语句：`subResult.unsubscribe()` 存在。而 `async` Pipe 就是简化这类操作，它帮你自动 `subscribe` 并在不需要的时候自动 `unsubscribe`，安全、靠谱。

示例：

```js
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  template: `
    <ul>
        <li *ngFor="let name of users | async">{{name}}</li>
    </ul>
  `
})
export class AppComponent {
  users: Observable<string[]>;

  ngOnInit() {
    this.users = Observable.of([ 'cipchk', 'asdf' ]);
  }
}
```

> 高级用法：pipe

- 创建：

  ```bash
  ng g pipe toArray
  ```

- 修改：

  ```js
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'toArray'
  })
  export class ToArrayPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
      if (typeof value == 'undefined' || value == null) {
        return;
      }
      var array = [];
      if (typeof value.length == 'undefined' || value.length == null) {
        array.push(value);
      } else {
        array = value;
      }
      return array;
    }
  }
  ```

- 使用：

  ```js
  import { Component } from '@angular/core';
  @Component({
    selector: 'app-root',
    template: `
     <ng-container *ngFor="let item of a">
      <ng-container
          *ngFor="let item2 of (item | toArray); let c = count ;let i = index;let o = odd; let e = even;">
          <div>
              <span class="mx-2">{{item2.s}}</span>
              <span class="mx-2">count==>{{c}}</span>
              <span class="mx-2">index==>{{i}}</span>
              <span class="mx-2">odd==>{{o}}</span>
              <span class="mx-2">even==>{{e}}</span>
          </div>
      </ng-container>
  </ng-container>
    `
  })
  export class AppComponent {
  	a = [
      { s: 1 },
      { s: 2 },
      [{ s: 3.1 }, { s: 3.2 }, { s: 3.3 }],
      { s: 4 },j
    ]
  }
  ```

> tips:  以上是当要循环的数组结构不满足需求时，要用管道对原数据进行修改再遍历，此法也可以用于限制循环次数，当然也可以在里面嵌入个ngif，设置如当index<10时显示列表。







-------------

### div 模拟 input

进入讲解前先了解一下contenteditable属性，可以令div像input那样可编辑，cool ！！

```html
<div contenteditable="true">可编辑文本</div>
```

由于contenteditable不是div的默认属性，所以绑定时要加上attr，如下：

```html
 <!-- modify自己在ts定义 -->
<div attr.contenteditable="{{modify}}">可编辑文本</div>
```

但这样出现新的问题：第一次的值总是true，待modify变更后才恢复正常，修改成如下问题解决：

```html
<div [attr.contenteditable]="modify">可编辑文本</div>
```

ps: 理论上这两种写法是一样的，虽然解决了，但不知道问题出在哪，回头再看

双向绑定

```html
<div [attr.contenteditable]="modify" [textContent]="myText"(input)="myText=$event.target.textContent"></div>
```

接下来模拟placeholder

```html
<div [attr.contenteditable]="modify" [textContent]="myText"(input)="myText=$event.target.textContent" placeholder="请填写相关信息"></div>
```

```css
/*为空时显示 placeholder*/
*[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  color: #a9a9a9;
}
/*内容不为空清除*/
*[contenteditable="true"]:not(*[contenteditable="true"]:empty):before {
  content: none;
}
```

input只能展示单行文本，这里实现div内自动换行

```html
<div [attr.contenteditable]="modify" [textContent]="myText" class="break-word"(input)="myText=$event.target.textContent" placeholder="请填写相关信息"></div>
```

```css
.break-word {
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
```

最近发现用(input)事件会导致光标自动移动到前面，用(blur)事件解决了

```html
<div [attr.contenteditable]="modify" [textContent]="myText" class="break-word"(blur)="myText=$event.target.textContent" placeholder="请填写相关信息"></div>
```



## angular 中的 ? 和 !

- ? 用来检查 问号前面的变量为 null 或 undefined 时，程序不会出错。

- ! 用来检查 感叹号后面的变量为 null 或 undefined 时， 程序不会出错。



## 疑难杂症

1. ngfor 中的input 使用同名的name会使得：只有第一个disable起作用，区分name的命名即可解决
