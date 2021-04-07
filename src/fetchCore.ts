import { defaultConfig, transfromResponse } from './defaultConfig';
import InterceptorManager from './interceptor';
import { TObj } from './type';

export default class FetchCore {

    private defaultConfig: TObj;
    private interceptor: TObj;
    private controller: Record<string, AbortController>;

    constructor() {
        /**
         * @description 默认配置
         */
        this.defaultConfig = defaultConfig;
        /**
         * @description 拦截器配置
         */
        this.interceptor = {
            interceptorReq: new InterceptorManager(),
            interceptorRes: new InterceptorManager(),
        }
        /**
         * @description 取消控制
         */
        this.controller = {};
    }
    /**
     * @description 创建Promise
     * @param result 
     */
    private async createPromise(result) {
        return await result
    }
    /**
     * @description 请求发起后结果处理
     * @param url 
     * @param data 
     * @param config 
     */
    private async init(options: TObj) {
        const res: any = await fetch(options.url, options);
        if (options?.dataType && !transfromResponse[options?.dataType]) {
            return `${options?.dataType}数据格式不存在！`
        }
        res.options = options;
        res.data = await res[options?.dataType || "json"]();
        return this.interceptorFun(res, "interceptorRes", (res) => {
            return this.createPromise(res)
        }, (rej) => {
            return rej
        });
    }
    /**
     * @description 合并config
     * @param config 
     */
    private mergeConfig(config: TObj, defaultConfig: TObj) {
        return this.filterConfig({
            ...defaultConfig,
            ...config
        }, defaultConfig)
    }
    /**
     * @description 过滤config
     */
    private filterConfig(config: TObj, defaultConfig: TObj) {
        Object.keys(config).forEach(key => {
            if (config[key] === undefined) {
                Reflect.deleteProperty(config, key);
            }
            if (defaultConfig[key] && typeof defaultConfig[key] === "object") {
                config[key] = this.mergeConfig(config[key], defaultConfig[key])
            }
        });
        return config;
    }
    /**
     * @description 拦截器执行
     * @param result 
     */
    private interceptorFun(options: TObj, type: string, resolveFun, rejectFun) {
        const chain = [];
        const obj = {
            interceptorReq: () => {
                this.interceptor.interceptorReq.forEach(res => {
                    chain.unshift(res.fulfilled, res.rejected)
                })
            },
            interceptorRes: () => {
                this.interceptor.interceptorRes.forEach(res => {
                    chain.push(res.fulfilled, res.rejected)
                })
            }
        }
        obj[type]();
        const result = this.createPromise(options).then(chain.shift(), chain.shift());
        return result.then(resolveFun, rejectFun);
    }
    /**
     * @description 重置信号量
     * @param t 时间戳
     */
    private setSignal(t: string) {
        this.controller[t] = new AbortController();
        return this.controller[t].signal;
    }
    /**
     * 
     * @param url 
     * @param data 
     * @param config 
     */
    //private getHashKey(url,data) {
    //    
    //}
    /** 
     * @description 请求入口
     * @param url
     * @param data
     * @param config
    */
    public async req(url: string, data?: TObj, config?: TObj) {
        const options: TObj = this.mergeConfig(config, this.defaultConfig);
        if (data) {
            options.body = JSON.stringify(data)
        }
        options.url = url;
        if (options.timeout) {
            const curtime:any = new Date().getTime();
            options.signal = this.setSignal(curtime);
            setTimeout((): void => this.abortable(curtime), options.timeout);
        }
        return this.interceptorFun(options, "interceptorReq", (res) => {
            return this.init(res);
        }, (rej) => {
            return rej
        });
    }
    /**
     * @description 请求中断
     * @param t 时间戳
     */
    public abortable(t: string) {
        if (this.controller[t]) {
            this.controller[t].abort();
            delete this.controller[t];
        }
    }
}
