##### hmfetch 介绍

hmfetch 是基于原生fetch基础上实现的一款简易的http请求包，包括了响应数据类型配置，自定义headers，请求超时配置，和拦截器配置

##### 安装

```
npm install hmfetch --save
```

##### 基本使用

```
import Fetch from "hmfetch";

Fetch.post(url,params).then((reslove)=>{
    console.log(reslove);
},(reject)=>{
    console.log(reject);
});

```

##### 超时配置（单位/毫秒）

```
import Fetch from "hmfetch";
Fetch.addConfig("timeout",5000);  // 5000 millisecond
```

##### 添加自定义Headers

```
Fetch.addConfig("headers", {
    'Authorization': `XXXXX`
})
```

##### 数据类型 （dataType）

响应数据类型包括  "json"||"blob"||"text"||"arrayBuffer"||"formData"  默认 json

```
import Fetch from "hmfetch";
Fetch.addConfig("dataType", "text");
```

##### formData

```
import Fetch from "hmfetch";

Fetch.post(url,{
    bodyType:"formData",  // 必须
    body:formData
}).then((reslove)=>{
    console.log(reslove);
},(reject)=>{
    console.log(reject);
});

```

##### 拦截器配置 （interceptor）

```
/** 请求拦截器 interceptorReq **/
Fetch.interceptor.interceptorReq.use((req) => {
    return req;
}, (reson) => {
    console.log(reson);
})

/** 响应拦截器 interceptorRes **/
Fetch.interceptor.interceptorRes.use((res) => {
    console.log(res);
    return res;
}, (reson) => {
    console.log(reson);
})
```

