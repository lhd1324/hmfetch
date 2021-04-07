export default class InterceptorManager {
  handler = [];
  // 添加拦截器
  use(fulfilled, rejected) {
    this.handler.push({ fulfilled, rejected });
    return this.handler.length - 1;
  }
  // 遍历拦截器
  forEach(cb) {
    this.handler.forEach(interceptor => {
      interceptor && cb(interceptor);
    });
  }
  // 删除拦截器
  // eject(id) {
  //   this.handler[id] = null;
  // }
}