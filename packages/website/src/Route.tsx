import {
  createHashRouter,
  Link,
  RouterProvider,
} from 'react-router-dom';
import githubIconUrl from './PNG/github-icon.png';
import Login from './examples/login';
import Cena from './examples/cena';
import IronChain from './examples/iron-chain';
import styled from 'styled-components';
import WatchingYou from 'react-watching-you';
import Landing from './Landing';

const ExampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;

  a {
    font-size: 32px;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 32px;
  background: #ccc;
`;

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
