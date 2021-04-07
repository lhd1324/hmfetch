##### hmfetch 

A simple, ease of use package ,it is  include timeout, headers, dataType and interceptor for http

##### install

```
npm install hmfetch --save
```

##### usage

```
import Fetch from "HFetch";

Fetch.post(url,params).then((reslove)=>{
    console.log(reslove);
},(reject)=>{
    console.log(reject);
});

```

##### timeout

```
import Fetch from "hmfetch";
Fetch.addConfig("timeout",5000);  // 5000 millisecond
```

##### Headers

```
Fetch.addConfig("headers", {
    'Authorization': `XXXXX`
})
```

##### dataType

include    "json"||"blob"||"text"||"arrayBuffer"||"formData"    default   json

```
import Fetch from "hmfetch";
Fetch.addConfig("dataType", "text");
```

##### interceptor

```
/** interceptorReq **/
Fetch.interceptor.interceptorReq.use((req) => {
    return req;
}, (reson) => {
    console.log(reson);
})

/** interceptorRes **/
Fetch.interceptor.interceptorRes.use((res) => {
    console.log(res);
    return res;
}, (reson) => {
    console.log(reson);
})
```

