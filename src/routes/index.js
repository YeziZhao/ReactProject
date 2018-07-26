import authorizedRoutes from './authorizedRoutes';
import normalRoutes from './normalRoutes';

const combineRoutes = [
    ...authorizedRoutes,
    ...normalRoutes,
];

export {
    combineRoutes,
    authorizedRoutes,
    normalRoutes
};