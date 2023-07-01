import { useRoutes } from 'react-router-dom';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '*', element: <NotFound /> },
  ]);
}

export default App;
