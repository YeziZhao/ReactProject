import createReducer from 'utils/createReducer';
import { fromJS } from 'immutable';

const defaultState = () => (
    {
        isLogin: false,
        user: {},
        loginErrorMsg: '',
        notices: [],
        notification: {
            title: '',
            content: ''
        }
    }
);

const loginSuccess = (state, action) => (
    fromJS(state)
        .setIn(['isLogin'], true)
        .setIn(['user'], action.payload)
        .toJS()
);

const loginError = (state, action) => (
    fromJS(state)
        .setIn(['isLogin'], false)
        .setIn(['loginErrorMsg'], action.payload)
        .toJS()
);

const resetLoginErrorMsg = state => (
    fromJS(state)
        .setIn(['loginErrorMsg'], '')
        .toJS()
);

const logout = (state) => (
    fromJS(state)
        .setIn(['isLogin'], false)
        .setIn(['user'], {})
        .toJS()
);

const getNoticesSuccess = (state, action) => (
    fromJS(state)
        .setIn(['notices'], action.payload)
        .toJS()
);

const updateNotification = (state, action) => (
    fromJS(state)
        .setIn(['notification'], action.payload)
        .toJS()
);

const resetNotification = state => (
    fromJS(state)
        .setIn(['notification'], {
                title: '',
                content: '',
            })
        .toJS()
);

export default createReducer(defaultState, {
    APP_LOGIN_SUCCESS: loginSuccess,
    APP_LOGIN_ERROR: loginError,
    APP_RESET_LOGIN_ERROR_MSG: resetLoginErrorMsg,
    APP_LOGOUT: logout,
    APP_GET_NOTICES_SUCCESS: getNoticesSuccess,
    APP_UPDATE_NOTIFICATION: updateNotification,
    APP_RESET_NOTIFICATION: resetNotification,
});