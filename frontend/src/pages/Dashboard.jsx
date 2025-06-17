import React from 'react';
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

export default Dashboard;
