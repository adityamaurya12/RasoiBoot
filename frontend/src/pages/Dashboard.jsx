import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState('');
  const [recommendedDishes, setRecommendedDishes] = useState([]);

  const quickAdd = ['Tomatoes', 'Onions', 'Garlic', 'Ginger', 'Rice', 'Chicken', 'Potatoes', 'Spinach', 'Paneer', 'Yogurt', 'Cumin', 'Turmeric'];

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

  const addIngredient = (item = input) => {
    if (item && !ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
      setInput('');
    }
  };

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter(i => i !== item));
  };

  // Save ingredients to backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && user.email && ingredients.length > 0) {
      axios.post("http://localhost:8080/api/users/ingredients", {
        email: user.email,
        ingredients: ingredients
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // optional
        }
      })
      .then(res => console.log("✅ Ingredients saved:", res.data))
      .catch(err => console.error("❌ Error saving ingredients:", err.response?.data || err.message));
    }
  }, [ingredients, user]);

  // Fetch recommended dishes
  useEffect(() => {
    if (user && user.email) {
      axios.post("http://localhost:8080/api/recommendations", {
        email: user.email
      })
        .then(res => {
          setRecommendedDishes(res.data);
          console.log("🍽 Recommended dishes:", res.data);
        })
        .catch(err => {
          console.error("❌ Error fetching recommendations:", err.response?.data || err.message);
        });
    }
  }, [user]);

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>🍳 RasoiBot</h2>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">My Recipes</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        </nav>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="main">
        <header>
          <h1>Welcome to <span>RasoiBot</span></h1>
          <p>Hello {user?.name || 'Chef'} 👩‍🍳! Add ingredients and discover delicious recipes instantly.</p>
        </header>

        <section className="manage-box">
          <h3>🥕 Manage Ingredients</h3>
          <div className="input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add an ingredient..."
            />
            <button onClick={() => addIngredient()}>Save</button>
          </div>

          <div className="quick-add">
            <h4>Quick Add:</h4>
            {quickAdd.map((item, i) => (
              <span key={i} onClick={() => addIngredient(item)}>{item}</span>
            ))}
          </div>

          <div className="selected-ingredients">
            <h4>Selected:</h4>
            {ingredients.map((item, i) => (
              <span key={i}>
                {item} <button onClick={() => removeIngredient(item)}>×</button>
              </span>
            ))}
          </div>
        </section>

        <section className="recommended">
          <h3>🍽 Recommended Dishes <span className="badge">{recommendedDishes.length} matches</span></h3>
          <ul>
            {recommendedDishes.length > 0 ? recommendedDishes.map((dish, i) => (
              <li key={i}>
                <img src={`https://source.unsplash.com/300x200/?${dish}`} alt={dish} />
                <div>
                  <strong>{dish}</strong>
                  <p>Suggested recipe based on your fridge items.</p>
                </div>
              </li>
            )) : <p>No recipes yet. Add ingredients to get started!</p>}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
