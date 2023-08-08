import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AddForm from './Components/AddForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/New-note" element={<AddForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
