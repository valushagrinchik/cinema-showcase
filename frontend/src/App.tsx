import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Catalog from './routes/Catalog';
import NotFound from './routes/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
