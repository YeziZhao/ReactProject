import { combineRoutes } from 'routes';

import filter from 'lodash/filter';
import map from 'lodash/map';
import head from 'lodash/head';
import authorizedRoutes from 'routes/authorizedRoutes';
import normalRoutes from 'routes/normalRoutes';

// const combineRoutes = [
//     ...authorizedRoutes,
//     ...normalRoutes,
// ];

const generateBreadcrumb = breadcrumb => (
    [{
        text: 'pageTitle_homePage',
        href: '/'
    }].concat(map(breadcrumb, (path) => {
        const { pageTitle } = head(filter(
            combineRoutes,
            route => route.path === path,
        ));
        return {
            text: pageTitle,
            href: path,
        };
  }))
)

export default generateBreadcrumb;
