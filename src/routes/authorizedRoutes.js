import Outlets from 'views/outlets';
import OutletDetail from 'views/OutletDetail';
import WrokInProgress from 'views/workInProgress';
import Unauthorized from 'views/unauthorized';

const authorizedRoutes = [
    {
        path: '/dashboard/analysis/realtime',
        exact: true,
        permissions: ['admin', 'user'],
        redirect: '/login',
        component: WrokInProgress,
        pageTitle: ''
    },
    {
        path: '/dashbord/analysis/offline',
        exact: true,
        permissions: ['admin', 'user'],
        redirect: '/login',
        component: WrokInProgress,
        pageTitle: '',
    }, 
    {
        path: '/dashboard/worksplace',
        exact: true,
        permissions: ['admin'],
        redirect: '/login',
        component: WrokInProgress,
        pageTitle: ''
    },
    {
        path: '/outlets',
        exact: true,
        permissions: ['admin', 'user'],
        component: Outlets,
        unauthorized: Unauthorized,
        pageTitle: 'pageTitle_outlets',
        breadcrumb: ['/outlets'],
    }, 
    {
        path: '/outlets/:id',
        exact: true,
        permissions: ['admin', 'user'],
        component: OutletDetail,
        unauthorized: Unauthorized,
        pageTitle: 'pageTitle_outletDetail',
        breadcrumb: ['/outlets', '/outlets/:id'],
    },
    {
        path: '/exception/403',
        exact: true,
        permissions: ['god'],
        component: WrokInProgress,
        unauthorized: Unauthorized
    }
];
export default authorizedRoutes;