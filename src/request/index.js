import axios from './axios';
import objToUrlParam from 'utils/objToUrlParam';

const defaultHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

let buildConfig = process.env.BUILD_CONFIG;

const instance = axios.create({
    baseURL: buildConfig.apiDomain,
    timeout: 5000,
    headers: defaultHeader,
    withCredentials: true,
});
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
            opt.instance.post(url, data)
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

