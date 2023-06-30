import { useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '*', element: <NotFound /> },
  ]);
}

export default App;
