import axios from 'axios';
import objToUrlParam from 'utils/objToUrlParam';

const defaultHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

let buildConfig = process.env.BUILD_CONFIG;

const instance = axios.create({
    // baseURL: buildConfig.apiDomain,
    timeout: 5000,
    headers: defaultHeader,
    withCredentials: true,
});

//添加一个请求拦截器
instance.interceptors.request.use(function(config){
    return config;
},function(err){
    return Promise.reject(error);
});

//添加一个响应拦截器
instance.interceptors.response.use(function(res){
    //在这里对返回的数据进行处理
    if (res.status < 400) {
        return res.data;
    }
    return Promise.reject(res.error);
}, function(err){
    let errMsg = err.response && err.response.data && err.response.data.error;
    return Promise.reject(errMsg || 'server internal error');
})
let api = () => {
    let opt = {
        instance
    };
    return {
        setOptions: (options) => {
            opt = {
                ...opt,
                ...options
            };
        },
        get: (url, query) => (
            opt.instance.get(url, {
                params: query
            })
        ),
        post: (url, data) => (
            instance.post(url, data)
        ),
        delete: (url) => (
            opt.instance.delete(url)
        ),
        upload: (url, file) => {
            const formData = new FormData();
            formData.append('file', file);
            this.setOptions({
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return opt.instance.post(url, formData)
        }
    };
};

export default api();

