import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/login';

const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
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
