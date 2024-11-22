import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CartPage from "./components/CartPage";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/products" style={{ marginRight: "10px" }}>Products</Link>
          <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
          <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
