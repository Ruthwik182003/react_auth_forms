import React, { useEffect, useState } from 'react';
import { submitForm } from '../services/api';
import { toast } from 'react-toastify';

export default function Form() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '' });

  useEffect(() => {
    const regUser = JSON.parse(localStorage.getItem('registeredUser') || 'null');
    if (regUser) setForm(regUser);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await submitForm(form);
      if (status === 200) {
        toast.success('Form submitted successfully');
        setForm({ name: '', email: '', phone: '', country: '' });
      } else {
        toast.error(data?.message || 'Submission failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Submit Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input className="input" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>EMailid</label>
          <input className="input" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone number</label>
          <input className="input" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Country</label>
          <input className="input" name="country" value={form.country} onChange={handleChange} />
        </div>
        <button className="button" type="submit">Send to Backend</button>
      </form>
    </div>
  );
}
