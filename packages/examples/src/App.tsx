import { createHashRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login';
import Cena from './pages/cena';
import Snake from './pages/snake';

const router = createHashRouter([
  {
    path: '/',
    element: <div>example page</div>,
  },
  {
    path: '/example/login',
    element: <Login />,
  },
  {
    path: '/example/cena',
    element: <Cena />,
  },
  {
    path: '/example/snake',
    element: <Snake />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
