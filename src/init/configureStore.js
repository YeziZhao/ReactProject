import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { createLogger } from 'redux-logger';
import reduxImmutableStoreInvariant from 'redux-immutable-state-invariant';
import { 
    createStore, 
    applyMiddleware, 
    compose,
    combineReducers
} from 'redux';
import { 
    connectRouter, 
    routerMiddleware 
} from 'connected-react-router';
// connected-react-router: 
// - 将路由状态与具有单项流的redux存储同步(history=>store=>router=>component)，
// - 分发history method（push, replace, go, goBack, goForward）适用于redux-thounk,redux-saga。
// - 嵌套的子项可以使用react-redux的connect直接访问路由状态，例如当前位置。
// - 支持Redux DevTools的时间旅行
function configureStore(history, preloadedState) {
    // enhancers
    let composeEnhancers = compose;

    if (typeof window !== 'unfefined') {
        // eslint-disable-next-line no-underscore-dangle
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    // middlewares
    const middlewares = [
        routerMiddleware(history),
        reduxThunk,
    ];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
        middlewares.push(reduxImmutableStoreInvariant());
    }

    const store = createStore(
        connectRouter(history)(combineReducers(reducers)), // connectRouter : 通过提供的history，提供一个新的root reducer集合
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares)), // routerMiddleware:如果需要使用history actions(push, replace...),使用该中间件
    );

    return {
        store, 
        history
    };
}
export default configureStore;