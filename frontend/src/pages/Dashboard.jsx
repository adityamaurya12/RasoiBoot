import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');

    if (loggedIn !== 'true' || !storedUser) {
      navigate('/login');
    } else {
      try {
        const userData = JSON.parse(storedUser);
        if (userData) setUser(userData);
      } catch (error) {
        console.error("Invalid user data:", error);
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name || 'Chef'}! 👩‍🍳</h2>
      {user && (
        <>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}
      <p>Explore personalized recipes based on your fridge ingredients.</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
