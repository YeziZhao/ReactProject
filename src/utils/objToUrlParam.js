// 用于将对象转化为url的参数
const objToUrlParam = (parmas) => {
    if (!parmas) {
        return '';
    }
    let parameters = '?';
    for(let param in params) {
        if (params[param] != null && params[param] != '') {
            if (parameters.length > 1) {
                parameters += '&';
            }
            parameters += param + '=' + params[param];
        }
    }
    return parameters;
};

export default objToUrlParam;