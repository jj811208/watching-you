import { createHashRouter, RouterProvider } from 'react-router-dom';
import Login from './examples/login';
import Cena from './examples/cena';
import IronChain from './examples/iron-chain';
import SvgPath from './examples/svg-path';
import Landing from './Landing';

const routeList = [
  {
    name: 'login',
    path: '/',
    element: <Landing />,
  },
  {
    name: 'login',
    path: '/example/login',
    element: <Login />,
  },
  {
    name: 'iron-chain',
    path: '/example/iron-chain',
    element: <IronChain />,
  },
  {
    name: 'cena',
    path: '/example/cena',
    element: <Cena />,
  },
  {
    name: 'svg-path',
    path: '/example/svg-path',
    element: <SvgPath />,
  },
];
const router = createHashRouter(routeList);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
