import axios from 'axios'
import qs from 'qs'
import router from "@/router";
import {Toast} from 'vant'
// const service=axios.create({
//     // baseURL 将自动加在 url`前面，除非 url 是一个绝对 URL。
//     // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
//     baseURL:'http://localhost:3000/',
//     //设置一个请求超时时间
//     timeout:60000,
//     // headers是被发送的自定义请求头
//     headers:{
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// })

axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错
axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */
/*超时设置*/
axios.defaults.timeout=15000;
/*请求拦截*/
axios.interceptors.request.use(
    config => {
        if (config.meth === 'post' && !(config.data instanceof FormData)) {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            config.data = qs.stringify(config.data, { arrayFormat: 'repeat' }) /*这里是，后端要求传数组的时候做的设置，以前出过错*/
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)
/* 响应拦截 */
axios.interceptors.response.use(
    res => {
        /*可在这里根据返回的状态码做一些拦截操作*/
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (res.status === 200) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
        }, err => {
        if(err.response.status){
            switch (err.response.status){
                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
        }
        return Promise.reject(err.response);
    }
)

/**
 * get方法，对应get请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @returns {Promise<unknown>}
 */
export function getRequest(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    });
}

/**
 * Post方法
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @returns {Promise<unknown>}
 */
export function postRequest(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(params)).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    });
}
export default axios  /*记得导出*/
