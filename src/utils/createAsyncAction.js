import api from 'request';

function createAsyncAction(name, url, reqType, data, meta = {}) {
    return async (dispatch) => {
        // 开始发起异步信息请求
        dispatch({
            meta,
            type: `${name}_REQUEST`,
        });
        try {
            let result = await api[reqType](url, data);
            const action = {
                meta,
                type: `${name}_SUCCESS`,
                payload: result
            };
            dispatch(action);
            return action;
        } catch(err) {
            const action = {
                meta,
                type: `${name}_ERROR`,
                payload: err,
                error: true,
            };
            dispatch(action);
            return action;
        }
    }
}
export default createAsyncAction;