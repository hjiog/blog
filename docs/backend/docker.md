---
title: docker 学习笔记
date: 2020-03-19
tags:
 - docker
categories:
 - 运维
---

## 授权
-  docker sudo 授权
<!-- more -->
`sudo usermod -aG docker yourName`

## 命令相关

- expose

  提供container之间的端口访问，和ports的区别是，expose不会将端口暴露给主机。同docker run --expose:

```
expose:
 - "3000"
 - "8000"
```

- ports
  将端口暴露给主机。同docker run -p。示例：

```
ports:
 - "3000"
 - "8000:8000"
 - "49100:22"
 - "127.0.0.1:8001:8001"
```

- depends_on
  用于指定服务依赖，一般是mysql、redis等。
  指定了依赖，将会优先于服务创建并启动依赖。

- CMD echo hello

  等价于

```
"Cmd": [
    "/bin/sh",
    "-c",
    "echo hello"
]
```

-----------

