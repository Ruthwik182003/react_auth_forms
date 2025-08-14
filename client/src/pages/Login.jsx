import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.password.trim()) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (storedUser && storedUser.email === form.email && storedUser.password === form.password) {
      toast.success('Login successful!');
      navigate('/Form');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
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
        <button className="button" type="submit">Login</button>
      </form>
      <div className="nav">
        <span>Don't have an account?</span>
        <Link className="link" to="/register">Register</Link>
      </div>
    </div>
  );
}
