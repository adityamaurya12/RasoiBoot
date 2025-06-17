// src/pages/Home.jsx
import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>🍲 Welcome to RasoiBot</h1>
      <p>Your AI-powered kitchen companion. Let us help you decide what to cook based on what’s already in your fridge!</p>
      
      <div className="home-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
