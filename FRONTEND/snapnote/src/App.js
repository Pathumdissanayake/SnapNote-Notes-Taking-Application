import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AddForm from './Components/AddForm';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/New-note" element={<AddForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
