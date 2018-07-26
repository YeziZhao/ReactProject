// import Loadable from 'react-loadable'; // react-loadable原理：http://react-china.org/t/react-loadable/11518
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import omitRouteRenderProperties from 'utils/omitRouteRenderProperties';
import checkPermissions from 'utils/checkPermissions';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

const propTypes = {
    authorities: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.func
    ]),
    normalLayout: PropTypes.func,
    authorizedLayout: PropTypes.func,
    normalRoutes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        redirect: PropTypes.string,
        component: PropTypes.func,
    })),
    authorizedRoutes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        component: PropTypes.func,
        redirect: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string),
        unauthorized: PropTypes.func,
      })),
      notFound: PropTypes.func
};

const defaultProps = {
    authorities: '',
    normalRoutes: [],
    normalLayout: props => (
        <div>{props.children}</div>
      ),
    authorizedRoutes: [],
    authorizedLayout: props => (
        <div>{props.children}</div>
      ),
    notFound: () => (
        <div>404</div>
      ),
};

class AclRouter extends Component {
    renderRedirectRoute = (route) => (
        <Route
            key={route.path}
            {...omitRouteRenderProperties(route)}
            render={() => <Redirect to={route.redirect}/>}
        />
    );

    // props pass to Layout & Component are history, location, match
    renderAuthorizedRoute = (route) => {
        const {
            authorizedLayout: AuthorizedLayout, // 页面布局组件，因为一个页面都是一样的头部，底部，菜单栏，因此将其抽取出来，然后将不一样的content组件当作child传入内部。相当于一个高阶组件，包裹在不同的页面组件上
            authorities // 用户信息上的角色权限对象，例如admin, user,
        } = this.props;

        const {
            permissions,
            path,
            component: RouteComponent,
            unauthorized: Unauthorized,
        } = route;

        const hasPermission = checkPermissions(authorities, permissions);

        if (!hasPermission && route.unauthorized) {
            return (
                <Route
                    key={path}
                    {...omitRouteRenderProperties(route)}
                    render={props => ( 
                        <AuthorizedLayout {...props}>
                            <Unauthorized {...props}/>
                        </AuthorizedLayout>
                    )}
                />
            );
        }

        if (!hasPermission && route.redirect) {
            return this.renderRedirectRoute(route);
        }

        // react-router 默认会将 match、location、history 等路由信息传递给 Route 的下一级组件。不会传递给child组件，因此需要手动将路由信息等传递给child页面组件。
        // 这里通过统一修改render实现，去掉route 对象上的 render, component属性，自定义render方法
        // 第二种方式可以：
        // let  = route.component;
        // <Route key={path} component={<RouteComponent {...props}/>} />
        return(
            <Route
                key={path}
                {...omitRouteRenderProperties(route)} 
                render={props => (
                    <AuthorizedLayout {...props}>
                        <RouteComponent {...props}/>
                    </AuthorizedLayout>
                )}
            />
        );
    };

    // props pass to Layout & Component are history, location, match
    renderUnAuthorizedRoute = (route) => {
        const {normalLayout: NormalLayout} = this.props; // NormalLayout： 不同的页面布局。通过这种方式，将登陆页面与主页面的框架不一样的问题解决了。
        const {
            redirect,
            path,
            component: RouteComponent
        } = route;
        // Checks if value is null or undefined.
        if (isNil(RouteComponent) && !isNil(redirect)) {
            return this.renderRedirectRoute(route);
        }

        return (
            <Route
                key={path}
                {...omitRouteRenderProperties(route)}
                render={props => (
                    <NormalLayout {...props}>
                        <RouteComponent {...props} />
                    </NormalLayout>
                )}
            />
        );
    };

    renderNotFoundRoute = () => {
        const { notFound: NotFound } = this.props;
        return (
          <Route
                render={props => (
                <NotFound {...props} />
            )}
          />
    )};

    render() {
        const {
            normalRoutes,
            authorizedRoutes
        } = this.props;
        // Switch 内部的Route : 多个符合条件，匹配一个。因此先按照 没权限 => 有权限 => notFound 进行配置
        // 没有Switch, 只要符合条件的都会匹配出现渲染
        return (
            <Switch>
                {
                    map(normalRoutes, route => (
                        this.renderUnAuthorizedRoute(route)
                    ))
                }
                {
                    map(authorizedRoutes, route => (
                        this.renderAuthorizedRoute(route)
                    ))
                }
                {
                    this.renderNotFoundRoute()
                }
            </Switch>
        );
    }
}

AclRouter.propTypes = propTypes;
AclRouter.defaultProps = defaultProps;
export default AclRouter;