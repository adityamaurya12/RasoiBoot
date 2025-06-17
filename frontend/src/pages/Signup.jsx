import React from 'react';
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
