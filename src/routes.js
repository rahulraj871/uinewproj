import  React from 'react';

const CaseStudy=React.lazy(()=>import('./pages/CaseStudy/CaseStudy'));
const Home=React.lazy(()=>import('./pages/Home/Home'));
const Login=React.lazy(()=>import('./pages/Login/Login'));

const routes = [
    { path: '/home', exact: true, name: 'Signup 1',component: Home },
    { path: '/casestudy', exact: true, name: 'Signup 1',component: CaseStudy },
    { path: '/login', exact: true, name: 'Signup 1',component: Login }
];

export default routes;
