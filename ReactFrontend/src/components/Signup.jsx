// src/components/Signup.js
import React, { useState } from 'react';
import cryptoJs from 'crypto-js';
import { API } from './API';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match!');
    }

    const hashedPassword = cryptoJs.SHA256(formData.password).toString(); // Hash the password

    const response = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        password: hashedPassword,
      }),
    });

    if (response.status == 201) {
      const data = await response.json()
      alert(data.message)
      window.location.href = '/';
    }
    else {
      const data = await response.json()
      alert(data.message)
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 style={{color: '#25363B'}}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
