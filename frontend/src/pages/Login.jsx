import React from 'react';
import '../styles/Login.css'; 
const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required /><br />
        <input type="password" placeholder="Password" required /><br />
        <button type="submit">Login</button>
      </form>
      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
      <p>
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
};

export default Login;
