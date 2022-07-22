import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import Repositories from './pages/Repositories';

export default function ProjectRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="repositories/:repositorie" element={<Repositories />} />
      </Routes>
    </BrowserRouter>
  )
}