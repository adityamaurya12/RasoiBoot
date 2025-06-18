/* import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome to your RasoiBot Dashboard 👩‍🍳</h2>
      <p>Here you’ll get personalized recipe suggestions based on what's in your fridge!</p>
      <button>Logout</button>
    </div>
  );
};

export default Dashboard; */

/* import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Use your existing or new styles

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard 👩‍🍳</h1>
      <p>This is your personal RasoiBot space.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard; */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>
      <p>Here you can explore recipes based on your fridge ingredients.</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
