---
title: 网络相关
date: 2021-01-18
tags:
 - 计网
categories:
 - 计网

---

## 下载xlsx文件

```js

const URL = `/api/xxx`;
const res = await axios.create()
.get(URL, {
  headers: {
    AppId: 123,
  },
  responseType: 'blob', // 重要
  withCredentials: true, // 携带cookie
})
.then((res) => {
  const {data} = res;
  const url = window.URL.createObjectURL(
    new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),
  );
  const fileName = 'download.xlsx';
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.click();
})
.catch(() => {
  message.error('下载失败');
});
return res;
```

