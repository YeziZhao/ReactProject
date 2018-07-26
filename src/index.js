import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
// history提供了三种方式创建history对象，依赖于环境
// - createBrowserHistory： 在浏览器模式下，支持HTML5 history API
// - createMemoryHistory: 引用接口，可以用来使用在non-DOM 环境，例如React Native 或者 test Enviroment
// - createHashHistory: 用于旧版本的web浏览器
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from 'store/configureStore';
import Router from 'routes/Router';
import 'antd/dist/antd.css';

let {
    store,
    history 
} = configureStore(createBrowserHistory(), {}) ;

let app = (store, history) => (
    <Provider store={store}>
        <Router history={history}/>
    </Provider>
);

ReactDOM.render(app(store, history), window.document.getElementById('app'));