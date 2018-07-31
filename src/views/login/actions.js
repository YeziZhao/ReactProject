import createAsyncAction from 'utils/createAsyncAction';
import Cookie from 'js-cookie';

const resetLoginErrorMsg = () => ({
    type: 'APP_RESET_LOGIN_ERROR_MSG',
});   


const login = (username, password) => {
    return createAsyncAction('APP_LOGIN', '/api/login', 'post', {
        username,
        password
    })
};

const loginUser = (action) => {
    return (dispatch) => {
        if (action.type === 'APP_LOGIN_SUCCESS') {
            Cookie.set('user', JSON.stringify(action.payload));
        }
        if (action.type === 'APP_LOGIN_ERROR') {
            setTimeout(() => dispatch(resetLoginErrorMsg()), 1500);
        }
    }
};

export default {
    loginUser,
    login
};