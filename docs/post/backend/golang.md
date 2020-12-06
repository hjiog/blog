---
title: golang 学习笔记
date: 2020-03-19
tags:
 - golang
categories:
 - 后端
---

## interface

Go语言并没有提供用于删除元素的语法或接口，而是通过利用切片本身的特性来删除元素——追加元素。


### 切片相关

- 1、将切片 b 的元素追加到切片 a 之后： `a = append(a, b...)`

- 2、复制切片 a 的元素到新的切片 b 上：

  ```golang
  b = make([]T, len(a))
  copy(b, a)
  ```

- 3、删除位于索引 i 的元素：` a = append(a[:i], a[i+1:]...)`

- 4、切除切片 a 中从索引 i 至 j 位置的元素： `a = append(a[:i], a[j:]...)`

- 5、为切片 a 扩展 j 个元素长度：` a = append(a, make([]T, j)...)`

- 6、在索引 i 的位置插入元素 x： `a = append(a[:i], append([]T{x}, a[i:]...)...)`

- 7、在索引 i 的位置插入长度为 j 的新切片：`a = append(a[:i], append(make([]T, j), a[i:]...)...)`

- 8、在索引 i 的位置插入切片 b 的所有元素：` a = append(a[:i], append(b, a[i:]...)...)`

- 9、取出位于切片 a 最末尾的元素 x：` x, a = a[len(a)-1], a[:len(a)-1]`

- 10、将元素 x 追加到切片 a： a = append(a, x)
  因此，您可以使用切片和 append 操作来表示任意可变长度的序列。



```go
slice := []int{1, 2, 3, 4, 5}
newSlice := slice[1:3] // [2,3]
fmt.Printf("newSlice长度:%d,容量:%d",len(newSlice),cap(newSlice))
对于底层数组容量是k的切片slice[i:j]来说
长度:j-i
容量:k-i
```

以上基于一个数组或者切片使用2个索引创建新切片的方法，此外还有一种3个索引的方法，第3个用来限定新切片的容量，其用法为`slice[i:j:k]`。

```
slice := []int{1, 2, 3, 4, 5}
newSlice := slice[1:2:3]
```

这样我们就创建了一个长度为`2-1=1`，容量为`3-1=2`的新切片,不过第三个索引，不能超过原切片的最大索引值5。





-----------------

go 服务端处理http请求

- 带有参数的url：

  - 先使用`r.ParseForm()` 解析url参数，适合于接收`x-www-form-urlencoded`类型的post请求或者普通get请求
  - 再用`r.Form["key"]`获取对应key的值

- 不带参的post请求：

  - json格式的请求(都用第二种好点)

  ```go　　　　
  result, _:= ioutil.ReadAll(r.Body)
  r.Body.Close()　　
  //结构已知，解析到结构体  　　　
  var s Serverslice;  　
  json.Unmarshal([]byte(result), &s)  　
  //json.Unmarshal(result, &s)
  ```

  - 用PostForm、MultipartForm实现

  > Form：存储了post、put和get参数，在使用之前需要调用ParseForm方法。

  > PostForm：存储了post、put参数，在使用之前需要调用ParseForm方法。

  > MultipartForm：存储了包含了文件上传的表单的post参数，在使用前需要调用  ParseMultipartForm方法。

  ```go
  fmt.Fprintln(w, r.PostFormValue("id"))
  ```

  ```go
  r.ParseMultipartForm(32<< 20)
  if r.MultipartForm != nil {
      values := r.MultipartForm.Value["id"]
      if len(values) > 0{
          fmt.Fprintln(w, values[0])
      }
  }
  ```

  > 区别：　　

  > PostForm：函数后接括号，同一个ｋey下只能有一个文件

  > MultipartForm：函数后接中括号，同一个ｋey下能有多个文件。每个key都是一个数组。　　

  [查看博客网址１]("https://blog.csdn.net/s630405377/article/details/51980534")
  [查看博客网址2]("https://blog.csdn.net/blackcardriver/article/details/88581069")

-------------

go 结构体方法

```
type SA struct {
	name string
}
```

//引用类型传递，方法可以修改结构内部的值（可读可写）

```
func (o *SA) SetName(n string) {
	o.name = n
}
```

//值传递，方法不可以修改结构内部的值（只读）

```
func (o SA) SetNameA(n string) {
	o.name = n
}
```

--------

