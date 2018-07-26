import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import indexOf from 'lodash/indexOf';
import map from 'lodash/map';

const checkPermissions = (authorities, permissions) => {
    // 不需要权限
    if (isEmpty(permissions)) {
        return true;
    }

    // 用户拥有权限，且是一个数组
    if (isArray(authorities)) {
        let hasPermission = false;
        for (let auth in authorities) {
            hasPermission = permissions.includes(auth);
            if (hasPermission) {
                break;
            }
        }
        return hasPermission;
    }

    if (isString(authorities)) {
        return permissions.includes(authorities);
    }

    if (isFunction(authorities)) {
        return authorities(permissions);
    }

    throw new Error('[react-acl-router]: Unsupport type of authorities');
};

export default checkPermissions;