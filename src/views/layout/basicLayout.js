import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'; // 计算class 的样式。https://www.npmjs.com/package/classnames
import { connect } from 'react-redux'; // 将redux数据注入到react组件中的桥梁
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl-context'; // 解决多国语问题，在外部将多国语文件传入组件内部。https://www.npmjs.com/package/react-intl-context
import { Link } from 'react-router-dom';
import { matchRoutes } from 'react-router-config'; // 静态路由配置，用于路由分割
import Sider from 'react-sider';
import 'react-sider/lib/index.css';
import menuData from './menuData';
import { combineRoutes } from 'routes';
import getFirstChar from 'utils/getFirstChar';
import generateBreadcrumb from 'utils/generateBreadcrumb';
import LoginChecker from 'hoc/LoginChecker';
import Notification from 'components/notification';
import logo from 'assets/logo.svg';
import './basicLayout.scss';
import get from 'lodash/get';
import map from 'lodash/map';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import layoutActions from './actions';
import {
    Avatar,
    Dropdown,
    Menu,
    Icon,
    Breadcrumb,
    Popover 
} from 'antd';

const propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    location: PropTypes.object.isRequired,
    isLogin: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    notices: PropTypes.array.isRequired,
    notification: PropTypes.object.isRequired, 
    intl: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

const defaultProps = {
    prefixCls: 'basicLayout',
    className: '',
};

class BasicLayout extends Component {
    constructor(props) {
        super(props);
    }

    formatMenuData = (menus) => {
        return map(menus, (menu) => {
            const result = {
                ...menu,
                name: this.props.intl.formatMessage({id: menu.name}) // 注意這裡的intl 是怎麼來的？待解決
            };
            if (menu.children) {
                result.children = this.formatMenuData(menu.children);
            }
            return result;
        })
    };

    // 头部
    renderHeader = () => {
        const {
            prefixCls,
            user,
            notices,
            actions,
            intl
        } = this.props;

        const deleteNotice = (id) => {
            actions.deleteNotice(id).then(callbackAction => {
                if (callbackAction.type === 'APP_DELETE_NOTICE_SUCCESS') {
                    actions.getNotices();
                }
                return null;
            })
        };
        
        const noticeMenu = isEmpty(notices) ?   
            (
                <div className={`${prefixCls}-noticeEmpty`}>
                    {intl.formatMessage({id: 'basicLayout_readall_notice'})}
                </div>
            ) :
            map(notices, notice => (
                <div
                    key={notice.id}
                    className={`${prefixCls}-noticeItem`}
                    onClick={() => {deleteNotice(notice.id)}}
                    role="presentation"
                >
                    <div className={`${prefixCls}-noticeTitle`}>{notice.title}</div>
                    <div className={`${prefixCls}-noticeMessage`}>{notice.message}</div>
                </div>
            ));
            
        // 页面右上角用户设置模块
        const userMenu = (
            <Menu>
                <Menu.Item disabled className={`${prefixCls}-userMenuItem`}>
                    <Icon type="user" className={`${prefixCls}-userMenuIcon`}/>
                    <span>{intl.formatMessage({ id: 'basicLayout_profile'})}</span>
                </Menu.Item>
                <Menu.Item disabled className={`${prefixCls}-userMenuItem`}>
                    <Icon type="setting" className={`${prefixCls}-userMenuIcon`}/>
                    <span>{intl.formatMessage({id: 'basicLayout_setting'})}</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item className={`${prefixCls}-userMenuItem`}>
                    <div
                        onClick={actions.logout}
                        role="presentation"
                    >
                        <Icon type="logout" className={`${prefixCls}-userMenuIcon`}/>
                        <span>{intl.formatMessage({id: 'basicLayout_logout'})}</span>
                    </div>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-notice`}>
                    <Popover
                        content={noticeMenu}
                        trigger="click"
                        placement='bottomRight'
                        arrowPointAtCenter
                    >
                        <Icon className={`${prefixCls}-noticeIcon`}  type="bell"/>
                    </Popover>
                </div>
                <Dropdown overlay={userMenu} placement="bottomRight">
                    <div className={`${prefixCls}-avatarContainer`}>
                        <Avatar className={`${prefixCls}-avatar`}>
                            {getFirstChar(user.name)}
                        </Avatar>
                    </div>
                </Dropdown>
            </div>
        );
    };

    // 面包屑
    renderBreadcrumb = () => {
        const {
            route : { breadcrumb },
            intl, 
            prefixCls
        } = this.props;
        const breadcrumbData = generateBreadcrumb(breadcrumb);

        return (
            <Breadcrumb className={`${prefixCls}-breadcrumb`}>
                {
                    map(breadcrumbData, (item, idx) => {
                        idx === breadcrumbData - 1 ? 
                            <Breadcrumb.Item key={item.href}>
                                {intl.formatMessage({id: item.text})}
                            </Breadcrumb.Item> :
                            <Breadcrumb.Item key={item.href}>
                                <Link href={item.href} to={item.href}>
                                    {intl.formatMessage({id: item.text})}
                                </Link>
                          </Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        );
    };  

    // 内容头部
    renderPageHeader = () => {
        const {
            prefixCls,
            route: { pageTitle },
            intl
        } = this.props;

        if (isEmpty(pageTitle)) {
            return null;
        }

        const pageTitleStr = intl.formatMessage({id: pageTitle});
        return (
            <div>
                <div className={`${prefixCls}-pageHeader`}>
                    {this.renderBreadcrumb()}
                    <div className={`${prefixCls}-pageTitle`}>{pageTitleStr}</div>
                </div>
            </div>
        );
    };

    // footer
    renderFooter = () => (
        <div className={`${this.props.prefixCls}-footer`}>
            Copyright zhaoyezi © 2018
        </div>
    );

    // 通知列表
    renderNotification = () => {
        const {
            notification: { title, content},
            resetNotification 
        } = this.props;

        if (isEmpty(title) && isEmpty(content)) {
            return null;
        }
        return (
        <Notification title={title} content={content} onDismiss={resetNotification} />
        );
    };

    render() {
        const {
            prefixCls,
            className,
            intl,
            isLogin,
            location,
            children,
        } = this.props;

        const classes = classnames({
            [prefixCls]: true,
            [className]: true, // 动态使用外部传入的样式名称
        });

        return (
            <LoginChecker isLogin={isLogin}>
                <div>
                    <div className={classes}>
                        <Sider
                            appName={intl.formatMessage({id: 'appName'})}
                            appLogo={logo}
                            menuData={this.formatMenuData(menuData)}
                            pathname={location.pathname}
                        />
                        <div className={`${prefixCls}-content`}>
                            {this.renderHeader()}
                            {this.renderPageHeader()}
                            <div className={`${prefixCls}-mainContent`}>
                                {children}
                            </div>
                            {this.renderFooter()}
                        </div>
                    </div>
                    {this.renderNotification()}
                </div>
            </LoginChecker>
        );
    }
}
const mapStateToProps = (state) => {
    // 通过请求的路由，拿到该路由的配置信息，存入route对象中。用于后面完成面包屑模块的资源获取
    const pathname = get(state, 'router.location.pathname', '');
    const { route } = head((matchRoutes(combineRoutes, pathname)));
    const {
        isLogin,
        user,
        notices,
        notification,
    } = state.app;
    return {
        isLogin,
        user,
        route,
        notices,
        notification,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(layoutActions, dispatch)
    };
}

BasicLayout.propTypes = propTypes;
BasicLayout.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(BasicLayout));