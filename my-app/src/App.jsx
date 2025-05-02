import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Order from './pages/Order';
import Invalid from './pages/Invalid';
import NavbarComponent from './components/NavbarComponent';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);



  return (
    <Router>
      
      <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path = "/order" element = { <Order/>} />
        <Route path="*" element={<Invalid/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
