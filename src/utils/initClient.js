import Cookie from 'js-cookie';
import isNil from 'lodash/isNil';
import layoutAction from 'views/layout/actions';

const initClient = (dispatch) => {
    const isLogin = !isNil(Cookie.get('user'));
    
    if (isLogin) {
       dispatch({
           type: 'APP_LOGIN_SUCCESS',
           payload: JSON.parse(Cookie.get('user')),
       });
       // 在用户点击通知栏时发出未读消息请求，弊端是用户在阅读消息前需要等待的时间，
       // 可以充分利用用户登录系统后但未点击通知栏这段空闲时间，可避免用户频繁点击通知栏的话导致大量的冗余异步请求被发送至后端
       dispatch(layoutAction.getNotices());
    }

    // 同理，这里可以完成国家时区信息，用户信息等
    // dispatch(layoutAction.getLocale())
};
export default initClient;