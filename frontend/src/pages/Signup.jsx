/* import React from 'react';
import '../styles/Signup.css';

const Signup = () => {
  return (
    <div className="signup">
      <h2>Create Account</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default Signup;
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (email && password) {
      // Save the user to localStorage (simulation)
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);

      alert('Signup successful! Please login.');
      navigate('/login');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
