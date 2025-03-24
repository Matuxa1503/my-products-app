import { FC } from 'react';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Products } from './pages/Products';

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
