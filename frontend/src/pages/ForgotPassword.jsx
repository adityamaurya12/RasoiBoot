import React from 'react';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <form>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Reset Password</button>
        <a href="/login">Back to Login</a>
      </form>
    </div>
  );
};

export default ForgotPassword;
