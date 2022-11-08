import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './examples/login';
import Cena from './examples/cena';
import IronChain from './examples/iron-chain';
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
    name: 'cena',
    path: '/example/cena',
    element: <Cena />,
  },
  {
    name: 'iron-chain',
    path: '/example/iron-chain',
    element: <IronChain />,
  },
];
const router = createHashRouter(routeList);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
