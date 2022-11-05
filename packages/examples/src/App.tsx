import {
  createHashRouter,
  Link,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/login';
import Cena from './pages/cena';
import IronChain from './pages/iron-chain';
import styled from 'styled-components';
const ExampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding:24px;

  a{
    font-size: 32px;
  }
`;
const exampleList = [
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
const router = createHashRouter([
  {
    path: '/',
    element: (
      <ExampleList>
        {exampleList.map((example) => {
          return (
            <Link key={example.path} to={example.path}>
              {example.name}
            </Link>
          );
        })}
      </ExampleList>
    ),
  },
  ...exampleList,
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
