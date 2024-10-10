import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PasswordResetPage from './pages/PasswordResetFormPage/PasswordResetFormPage';
import PasswordResetLinkPage from './pages/PasswordResetLinkPage/PasswordResetLinkPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/password-reset/confirm" element={<PasswordResetLinkPage />} />
      </Routes>
    </Router>
  );
}

export default App;
