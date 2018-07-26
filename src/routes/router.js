import React from 'react';
import { Route } from 'react-router-dom';
import AclRouter from './aclRouter';
import { ConnectedRouter } from 'connected-react-router'; // 为了在项目中使用history的各种方法，而官方推荐方法其实是withRouter。https://github.com/brickspert/blog/issues/3
import ReactDOM from 'react-dom';
import { MultiIntlProvider } from 'react-intl-context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authorizedRoutes from './authorizedRoutes';
import normalRoutes from './normalRoutes';
import BasicLayout from 'layout/BasicLayout';
import NormalLayout from 'layout/NormalLayout';
import NotFound from 'views/notFound';

// 获取多国语数据
const messages = process.env.BUILD_LOCALE_MESSAGES;
const buildConfig = process.env.BUILD_CONFIG;
const { locale } = buildConfig;

const propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};
let Router = ({
    user, 
    history
}) => (
    // 使用ConnectedRouter 包裹React v4 routing,并且将history作为props传入，将其作为react-redux’s Provider 的children传入 
    <ConnectedRouter history={history}> 
        <MultiIntlProvider
            defaultLocale={locale}
            messageMap={messages}
        >
            <AclRouter 
                authorities={user.authorities}
                authorizedRoutes={authorizedRoutes}
                authorizedLayout={BasicLayout}
                normalRoutes={normalRoutes}
                normalLayout={NormalLayout}
                notFound={NotFound}
            />
        </MultiIntlProvider>
    </ConnectedRouter>
);

const mapStateToProps = state => ({
    user: state.app.user
});

Router.propTypes = propTypes;
export default connect(mapStateToProps)(Router);