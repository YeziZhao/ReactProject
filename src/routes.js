import Loadable from 'react-loadable'; // react-loadable原理：http://react-china.org/t/react-loadable/11518
import map from 'lodash/map';
import { Route } from 'react-router-dom';
import React from 'react';
import Home from 'view/home';

const AsyncHome = Loadable({
    loader: () => import('view/home'),
    loading: () => null,
});

const routes = [
    {
    path: '/',
    exact: true,
    component: AsyncHome
    },
    // {
    //     path: '/user',
    //     component: AsyncUser,
    // }
];

function Routes() {
    return (
        // <div>
        //     {/* {
        //       map(routes, (route, index) => (
        //           <Route key={index} {...route}/>
        //       ))
        //     } */}
        // </div>
        <div>
        <Route path="/" component={AsyncHome}/>
        </div>
    );
}   
export default Routes;