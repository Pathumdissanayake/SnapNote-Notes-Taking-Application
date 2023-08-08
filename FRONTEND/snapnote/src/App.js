import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
