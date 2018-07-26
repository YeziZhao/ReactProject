// 处理所有的api,进行统一http请求拦截器处理
import axios from 'axios';

// 超时处理
axios.defaults.timeout = 5000;

// http 请求拦截
axios.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err)
});

// http 请求响应拦截
axios.interceptors.response.use(resp => {
    if (resp.status < 400) {
        return resp.data;
    }
     // if (error.response && error.response.status === 401) {
    //         // 返回 401 清除token信息并跳转到登录页面
    //         store.commit(types.LOGOUT);
    //         router.replace({
    //             path: 'login',
    //             query: {redirect: router.currentRoute.fullPath}
    //         })
    // }
    return Promise.reject(resp.data);
}, err => {
    debugger
    return Promise.reject(err);
});

export default axios;