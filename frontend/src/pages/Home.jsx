// src/pages/Home.jsx
import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">RasoiBot</h1>
        <p className="home-subtitle">
          Your AI-powered kitchen companion for discovering amazing recipes based on ingredients you already have in your fridge!
        </p>
        <div className="home-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
