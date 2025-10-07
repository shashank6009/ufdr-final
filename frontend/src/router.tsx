import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { Home } from './pages/Home';
import { Placeholder } from './pages/Placeholder';
import { Results } from './pages/Results';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'placeholder',
        element: <Placeholder />,
      },
    ],
  },
]);
