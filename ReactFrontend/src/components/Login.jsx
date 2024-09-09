// src/components/Login.js
import React, { useState } from 'react';
import cryptoJs from 'crypto-js';
import { API } from './API';

const Login =()  => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const hashedPassword = cryptoJs.SHA256(password).toString(); // SHA-256 hash

    const response = await fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: hashedPassword }),
    });

    if (response.status == 200) {
      const data = await response.json()
      alert(data.message)
      sessionStorage.setItem('user', JSON.stringify(data.user))
      sessionStorage.setItem('token', data.token)
      window.location.href = "/notes"
    }
    else {
      const data = await response.json()
      alert(data.message)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{color: '#25363B'}} >Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
