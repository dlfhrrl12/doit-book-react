import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Diary from '../pages/Diary';
import { ContextProvider } from '../context/ContextProvider';

const Router = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Diary" element={<Diary />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default Router;
