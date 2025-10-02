import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/login" />;
};

const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/login" element={
          <AuthWrapper>
            <Login />
          </AuthWrapper>
        } />
        <Route path="/register" element={
          <AuthWrapper>
            <Register />
          </AuthWrapper>
        } />
        {/* Redirect unmatched routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
