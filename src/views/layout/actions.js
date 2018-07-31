import createAsyncAction from 'utils/createAsyncAction';
import Cookie from 'js-cookie';

const getNotices = () => (
    createAsyncAction('APP_GET_NOTICES', '/api/notices', 'get')
);

const deleteNotice = (id) => (
    createAsyncAction('APP_DELETE_NOTICE', `/api/notices/${id}`, 'delete')
);

const logout = () => {
    Cookie.remove('user');
    return ({
        type: 'APP_LOGOUT'
    });
}
export default {
    getNotices,
    deleteNotice,
    logout
};