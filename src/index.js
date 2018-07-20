import React from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';
import { ConnectedRouter } from 'connected-react-router'; // 为了在项目中使用history的各种方法，而官方推荐方法其实是withRouter。https://github.com/brickspert/blog/issues/3
import ReactDOM from 'react-dom';
// history提供了三种方式创建history对象，依赖于环境
// - createBrowserHistory： 在浏览器模式下，支持HTML5 history API
// - createMemoryHistory: 引用接口，可以用来使用在non-DOM 环境，例如React Native 或者 test Enviroment
// - createHashHistory: 用于旧版本的web浏览器
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from 'init/configureStore';
import './styles/index.scss';


import { Route } from 'react-router-dom';


let {
    store,
    history 
} = configureStore(createBrowserHistory(), {}) ;

let app = (store, history) => (
    <Provider store={store}>
        {/* 使用ConnectedRouter 包裹React v4routing,并且将history作为props传入，
        将其作为react-redux’s Provider 的children传入 */}
        <ConnectedRouter history={history}> 
            <Routes />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app(store, history), window.document.getElementById('app'));