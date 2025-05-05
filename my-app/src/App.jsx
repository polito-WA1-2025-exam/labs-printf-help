import Layout from './pages/Layout'

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Order from './pages/Order';
import Invalid from './pages/Invalid';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import OrderClass from './modules/order.mjs'; // Import the Order class


function App() {
  const emptyOrder = new OrderClass(); // Create an empty order instance

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [order, setOrder] = useState(emptyOrder); // Initialize order state

  const handleLogin = () => {
    setIsLoggedIn(true)
    order.setUserID(1); // Set user ID to 1 for the logged-in user
  };
  const handleLogout = () => {
    setIsLoggedIn(false)
    setOrder(emptyOrder); // Reset the order when logging out
  };

  const addBowlToOrder = (bowl) => {
    setOrder((prevOrder) => {
      prevOrder.addBowl(bowl); // Add the bowl to the order
      return prevOrder; // Return the updated order
    })
  }

  const deleteBowlFromOrder = (id) => {
    setOrder((prevOrder) => {
      prevOrder.delBowl(id); // Delete the bowl from the order
      return prevOrder; // Return the updated order
    })
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} isLoggedIn={isLoggedIn} onLogout={handleLogout} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path = "order" element = { <Order addBowlToOrder = {addBowlToOrder}/>} />
          <Route path="*" element={<Invalid/>} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
