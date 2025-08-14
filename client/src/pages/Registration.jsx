import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css'; // keep using same UI styles

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Store registered user (temporary local storage for demo)
    localStorage.setItem('registeredUser', JSON.stringify({ email: form.email, password: form.password }));
    toast.success('Registration successful!');
    setTimeout(() => navigate('/login'), 900);
  };

  return (
    <div className="container">
      <h1 className="h1">Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        
        {/* Email */}
        <div>
          <label>Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password</label>
          <input
            className="input"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>

        <button className="button" type="submit">Register</button>
      </form>

      <div className="nav">
        <span>Already registered?</span>
        <Link className="link" to="/login">Login</Link>
      </div>
    </div>
  );
}
