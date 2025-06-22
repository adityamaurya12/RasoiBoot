import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Keep using your friend's updated CSS

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ingredients, setIngredients] = useState(['Onions', 'Cumin', 'Turmeric', 'Ginger', 'Chicken', 'Potato']);
  const [input, setInput] = useState('');

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
            <button onClick={() => addIngredient()}>Add</button>
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
          <h3>🍽 Recommended Dishes <span className="badge">3 matches</span></h3>
          <ul>
            <li>
              <img src="https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken-.jpg" alt="Butter Chicken" />
              <div>
                <strong>Butter Chicken</strong>
                <p>Creamy and rich chicken curry with aromatic spices.</p>
                <small>🕒 45 mins | 🔥 Medium</small>
              </div>
            </li>
            <li>
              <img src="https://tastycookingaroma.com/wp-content/uploads/2024/02/Palak-Paneer-Curry-Recipe-Served-on-a-white-bowl-1536x861.jpg" alt="Palak Paneer" />
              <div>
                <strong>Palak Paneer</strong>
                <p>Spinach-based curry with tender cubes of paneer.</p>
                <small>🕒 30 mins | 🧑‍🍳 Easy</small>
              </div>
            </li>
            <li>
              <img src="https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg" alt="Vegetable Biryani" />
              <div>
                <strong>Vegetable Biryani</strong>
                <p>Fragrant rice with a medley of spiced vegetables.</p>
                <small>🕒 60 mins | ⚠️ Hard</small>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
