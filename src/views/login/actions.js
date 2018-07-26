import createAsyncAction from 'utils/createAsyncAction';
import Cookie from 'js-cookie';

const resetLoginErrorMsg = () => ({
    type: 'APP_RESET_LOGIN_ERROR_MSG',
});   

const loginUser = (username, password) => {
    return createAsyncAction('APP_LOGIN', '/login', {
        username,
        password
    }, 'post');
    
    // return dispatch => {
    //     if (action.type === 'APP_LOGIN_SUCCESS') {
    //         Cookie.set('user', JSON.stringify(action.payload));
    //     }
    //     if (action.type === 'APP_LOGIN_ERROR') {
    //         setTimeout(() => dispatch(resetLoginErrorMsg()), 1500);
    //     }
    // }
};

export default {
    loginUser
};