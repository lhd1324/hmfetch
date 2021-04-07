// 默认配置
export const defaultConfig = {
    method: 'POST',
    credentials: 'same-origin',
    referrerPolicy: 'origin',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    baseUrl: "",
    validateStatus(status) {
        return status >= 200 && status < 300;
    }
}
// response body 转化
export const transfromResponse = {
    arrayBuffer: async res => await res.arrayBuffer(),
    text: async res => await res.text(),
    blob: async res => await res.blob(),
    formData: async res => await res.formData(),
    json: async res => await res.json()
}