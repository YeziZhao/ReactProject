
import Login from 'views/login';

const normalRoutes = [{
    path: '/',
    exact: true,
    redirect: '/outlets',
  }, {
    path: '/login',
    exact: true,
    component: Login,
}];

export default normalRoutes;