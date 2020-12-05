---
title: git 学习笔记
date: 2020-03-19
tags:
 - git
categories:
 - 其他
---

## git 相关

### 基础

#### 分支合并

在master上执行：

- git merge fix ==> 创建一个新的节点，将master 和 fix 的内容都合并在这个节点上，再将master 移动到该节点，原mater节点保留，此时master有两个父节点

- git rebase fix ==> 注意是把master 上的内容追加到 fix  上，原master节点将会消除，此时master只有一个父节点fix
- git rebase fix another ==>  将another  分支追加到 fix ，若another为空，则将当前所在的分支追加
- git cherry-pick c1 c9 ==> 创建两个新节点，将c1 和 c9 的提交分别追加进去，master最后位于 c9 节点，当然追加的数量是任意的，例如 git cherry-pick c1 c4 c8

#### 分支移动

- git checkout 哈希值  ==> 移动到该值对应的节点

- git checkout HEAD^ ==> 移动到上一个节点

- git checkout HEAD^2 ==> 移动到上一个节点的第二个兄弟节点

- git checkout HEAD~9 ==> 移动到上第九个节点，数字可自定义

- git branch -f master (哈希值｜HEAD^| HEAD~7) ==> HEAD不变，master分支移动到对应的位置

#### 撤销历史

- git reset  (哈希值｜HEAD^| HEAD~7)  ==> 用于回退本地分支，本地仓库回退后对子节点不可见

- git revert  (哈希值｜HEAD^| HEAD~7)  ==> 用于回退远程分支，将回退的操作加到一个新节点，这样既可以达到回退的效果而原来的节点也没有变

#### 远程相关

- 分支不存在

git checkout -b totallyNotMaster o/master

- 分支存在

git branch -u o/master foo   foo省略的话默认是当前分支

- git branch -u origin/master test ==> 使本地的test分支关联远程的master，如果省略test，则关系本地的当前分支

- git push origin master ==> 切到本地仓库中的“master”分支，获取所有的提交，再到远程仓库“origin”中找到“master”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我，可以在任意节点执行

- git push origin foo^:master ==> 以foo的上一个节点为参考，上传所有未被包含到远程仓库里 `master` 分支中的提交记录，当：后面的分支远程不存在时，会自动创建

- git push origin :foo ==> 通过给 push 传空值 source，删除本地的 origin/foo 分支和远程仓库中的 `foo` 分支

#### Tag 相关

- git tag v1.0 c1 ==> 在 c1 的节点上打上tag v1.0

- git describe master ==>  输出离master最近的tag信息，格式为\<tag>_\<numCommits>_g\<hash>，如 v0_2_gC2 表示 master 所在节点的哈希值为C2 , 最近的tag是v0 , 距离master有2个节点的距离

#### 其他

- git rebase -i c1  ==> 以交互式的方式调整c1到当前HEAD的各节点顺序，还可以直接排除某个节点，然后根据你操作的结果生成新的节点


### git 设置公钥

`ssh-keygen -t rsa -C "youremail@abc.com"`

### 解决git clone 慢的问题

```bash
nslookup github.global.ssl.fastly.Net
nslookup github.com
# 将找到的ip地址写入/etc/host
13.229.188.59 github.com
151.101.229.194 github.global.ssl.fastly.Net
# 刷新dns缓存
# manjaro linux系统下使用命令： sudo systemctl restart NetworkManager.service
```

### 小技巧

1. 当代码写到一半时忽然有个紧急bug，想切换到另一分支修改，此时可以：

```bash
git stash
```

2. 改完bug想回到自己的分支再次愉快得码代码时，可以执行：

```bash
git stash pop
```

3. 但有一种情况，你突然想在这之前合并一下主分支，于是你在你的分支执行：

```bash
git merge master
```

4. 此时合并后发现有冲突了，改完冲突后你又想切换分支了，执行第一步的命令，哎，发现这种情况这条命令不能成功运行，此时可以回退版本

```bash
git reset
```

> **reset** 如果不加参数，那么默认使用 **--mixed** 参数。它的行为是：保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 **reset** 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合（mixed）放在工作目录中」。

5. 再次执行 `git stash` ，成功！

----------

将A分支的a文件合并到B分支的a文件上。可以通过以下方式合并:

```bash
git checkout B
git checkout --patch A a
```

先切换到B分支，将A分支的a文件给与B。
然后碰到了Apply this hunk to index and worktree [y,n,q,a,d,/,K,j,J,g,e,?]

> 解释
>
> y - 存储这个hunk
> n - 不存储这个hunk
> q - 离开，不存储这个hunk和其他hunk
> a - 存储这个hunk和这个文件后面的hunk
> d - 不存储这个hunk和这个文件后面的hunk
> g - 选择一个hunk
> / - 通过正则查找hunk
> j - 不确定是否存储这个hunk，看下一个不确定的hunk
> J - 不确定是否存储这个hunk，看下一个hunk
> k - 不确定是否存储这个hunk，看上一个不确定的hunk
> K -不确定是否存储这个hunk，看上一个hunk
> s - 把当前的hunk分成更小的hunks
> e - 手动编辑当前的hunk
> ? - 输出帮助信息

### git clone 部分文件夹

1. 新建一个文件夹，在该目录运行bash

2. 初始化仓库

   ```bash
   git init
   ```

3. 设置sparsecheckout

   ```bash
   git config core.sparsecheckout true
   ```

4. 设置你要克隆的文件夹，假如你想克隆test文件夹，输入

   ```bash
   echo 'test' >> .git/info/sparse-checkout #注意这个命名一定要正确
   # 查看是否设置成功 more .git/info/sparse-checkout(more类似于cat命令，用于查看
   ```

5. 添加远程仓库，后面填你的地址名

   ```bash
   git remote add origin git@gitee.com:xxx
   ```

6. 拉取代码

   ```bash
   git pull origin master
   ```

- 遇到"您的配置中指定要合并远程的引用\<xxxxx>,但是没有获取到这个引用。"这个问题时，请检查远程仓库是否有\<xxxxx>这个分支
