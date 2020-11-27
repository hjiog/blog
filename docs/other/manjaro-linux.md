---
title: manjaro linux 学习笔记
date: 2020-03-19
tags:
 - manjaro linux
categories:
 - 其他
---

## 查看哪个端口被占用

```
abloume@ubuntu:~$ netstat -tln | grep 8000
tcp        0      0 192.168.2.106:8000      0.0.0.0:*               LISTEN
```
<!-- more -->



## 查看被占用端口的PID：

```
abloume@ubuntu:~$ sudo lsof -i:8000
COMMAND PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx   850     root    6u  IPv4  15078      0t0  TCP 192.168.2.106:8000 (LISTEN)
nginx   851 www-data    6u  IPv4  15078      0t0  TCP 192.168.2.106:8000 (LISTEN)
nginx   852 www-data    6u  IPv4  15078      0t0  TCP 192.168.2.106:8000 (LISTEN)
```



## kill掉该进程:

`sudo kill -9 850`



## 同步软件包数据库

`sudo pacman -Syy`



## 安装各种文件

### linux tar.gz文件安装

```
1、将安装文件拷贝至你的目录中，如果是以root身份登录上的，就将软件拷贝至/root中。

#cp xxx.tar.gz /root

2、解压缩。

#tar xvzf xxx.tar.gz

或直接双击解压缩.

3、检查编译。

#./configure

4、检查通过后，将生成用于编译的MakeFile文件。此时，可以开始进行编译。

#make。

5、成功编译后，开始安装。

#make install

6、安装完毕，应清除编译过程中产生的临时文件和配置过程中产生的文件。

#make clean

#make distclean

7、如果要卸载，则执行make uninstall
```

### 安装.deb文件

- 升级`sudo debtap -u `
- 转换`debtap quadrapassel_3.22.0-1.1_arm64.deb `
  - license填GPL
- 安装`sudo pacman -U <package-name> `

### 安装rpm文件

- 创建一个目录存放rpm文件
- 在该目录新建PKGBUILD文件，内容如下：

```
pkgname=xMind
pkgver=current
pkgrel=1
pkgdesc="Add a simple disprection."
arch=('x86_64')
license=('unknown')
makedepends=('rpmextract')
options=('emptydirs')
source=("./XMind-2020-for-Linux-x86-64bit-10.2.1-202008051959.rpm")
md5sums=('c69f0e07e33fd6386bcec5d8c222b330')

build() {
rpmextract.sh ../XMind-2020-for-Linux-x86-64bit-10.2.1-202008051959.rpm
}

package() {
cd $srcdir
rsync -ruDq $srcdir $pkgdir
}
```

说明如下：

```
pkgname 程序名称（强制格式：小写，无空格等）
pkgver 版本（默认“current”吧）
pkgrel 内部版本号，对于包的每次更改都应增加1
pkgdesc 简短描述（少于约80个字符）
arch 架构（i686，x86_64，两者任意一种，或都支持）
url 包的官方网站的URL（可选）
license 许可证（GPL，BSD，unknown等）
depends 程序可能具有的任何依赖项（若多个以空格分隔，而不是逗号）
makedepends 只需要构建但不运行程序的依赖关系('rpmextract optipng'或'rpmextract')
options 任意选项（在这种情况下，提取后有一些空目录，我发现不必要，所以我使用了emptydirs选项）
源文件列表（如果是URL，则会在安装时下载这些.rpm文件，但也可以直接将.rpm软件包放在与PKGBUILD文件相同的文件夹中）
md5sums 文件的md5sums列表（您可以通过在包含文件的文件夹中运行“makepkg -g”来获取这些文件的md5sums）。
最后是构建脚本进行提取
```

- 先运行“makepkg -g”获取md5sums,再运行makepkg
- 得到一个压缩文件，再运行`sudo pacman -U pkgname.pkg.tar.xz`
- 找到桌面运行程序，此处是`/src/usr/share/applications/XMind.desktop`
- 有可能路径设置错误，用记事本打开`XMind.desktop`设置一下路径并配置一下权限就ok了

## manjaro 更新dns

```sudo systemctl restart NetworkManager.service```



## 关机/重启

```
shutdown –h now       //立即关机
shutdown –h 12:00      //在12:00关机
shutdown +5 “This System will be shutdown in 5 minutes”
shutdown –r +3 “3分钟后关机重启”
```



## 系统清理

- 清除系统中无用的包 `sudo pacman -R $(pacman -Qdtq)`

- 清理已下载的安装包 `sudo pacman -Scc`
- 查看日志文件 `journalctl --disk-usage` 或 `sudo du -t 100M /var`

- 删除指定大小日志 `sudo journalctl --vacuum-size=50M`
- 限制日志存活时间 `journalctl --vacuum-time=1months`



## liunx 新增环境变量

在~/.profile 或 ～/.bashrc 添加：(此操作对当前用户有效，推荐，若对所有用户生效则改/etc/profile)

```bash
export PATH=$PATH:/yourpath1:/yourpath2
```

执行 `source ~/.profile` 或重启系统生效



## linux 下操作swap文件

- 查看 ： `swapon -s`
- 创建 ： `dd if=/dev/zero of=/swapfile bs=1M count=8192`
  （dd命令示例：***将本地的/dev/hdb整盘备份到/dev/hdd***：`dd if=/dev/hdb of=/dev/hdd`）

- 设置交换文件 ： `mkswap swapfile`

- 启动 ： `swapon /swapfile`

- 设置开机挂载 ：` vim /etc/fstab`  在最下面添加

  `/swapfile swap swap defaults 0 0`

- 停用 ： `swapoff swapfile`

- 删除 ： `rm -rf swapfile `



## 安装搜狗拼音

```bash
sudo pacman -S fcitx
sudo pacman -S fcitx-configtool
sudo pacman -S fcitx-gtk2 fcitx-gtk3
sudo pacman -S fcitx-qt4 fcitx-qt5
sudo pacman -S fcitx-sogoupinyin
sudo nano ~/.xprofile
```

在.xprofile添加

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```





## vim使用

### 复制内容到剪切板

> y是复制，p是粘贴

- 查看vim版本是否支持clipboard

```sh
vim --version | grep "clipboard"
```

- 查看vim寄存器件

打开vim输入`:reg`查看vim的寄存器，当支持clipboard之后，会多出`"+`寄存器，表示系统剪切板。

- 复制到剪切板

在vim中进入visual视图后使用`"Ny`(N表示特定寄存器编好)，将内容复制到特定的剪切板，那么我们的目的是要复制到系统剪切板则需要选中内容后输入命令：

```sh
"+y
```

- 粘贴到特定的寄存器也是同理。例如`"+p`将系统剪切板的内容拷贝到vim中（非编辑模式下）。

### 查找

在normal模式下输入`/要找的单词名`，然后回车，按n查找下一个，按N查找上一个，当然也可以按`shift`+`n`



## 命令快捷键

### 显示桌面

win + d

