import FetchCore from './fetchCore';
import { TObj } from './type';
/**
 * @description 实例化Fetch对象，对外暴露方法
 */

class Fetch extends FetchCore {
    public config: TObj;
    constructor() {
        super();
        this.config = {}
    }
    /**
     * @description 添加config
     * @param key 键名 string
     * @param value 键值 object || 基础类型
     */
    addConfig(key: string, value?: any) {
        (value && typeof value === "object") ?
            this.config[key] = {
                ...this.config[key],
                ...value
            } : this.config[key] = value
    }
    post(url: string, data: TObj) {
        this.addConfig("method", "POST");
        return this.req(url, data, this.config);
    }
    get(url: string) {
        this.addConfig("method", "GET");
        return this.req(url, null, this.config);
    }
    create() {
        return new Fetch();
    }
}
const $Fetch: any = new Fetch()
Object.defineProperty($Fetch, 'defaultConfig', {
    enumerable: false,
    writable: false
})

export default $Fetch;
