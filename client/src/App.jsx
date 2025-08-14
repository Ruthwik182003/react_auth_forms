import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Form from './pages/Form.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <>
      <div className="nav" style={{paddingTop: 16}}>
        <Link className="link" to="/register">Register</Link>
        <Link className="link" to="/login">Login</Link>
        <Link className="link" to="/form">Form</Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h3 style={{textAlign:'center'}}>Not Found</h3>} />
      </Routes>
    </>
  );
}
