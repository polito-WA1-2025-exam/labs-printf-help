// import NavbarComponent from './components/NavbarComponent';
// import GridComponent from './components/GridComponent';
// import HeaderSteps from './components/HeaderSteps';
// import './index.css'; // Make sure this import exists
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const gridItems = [
//     {
//       id: 1,
//       title: "Item 1",
//       content: "This is a sample grid item. The layout will adjust automatically."
//     },
//     {
//       id: 2,
//       title: "Item 2",
//       content: "This is another sample grid item."
//     },
//     {
//       id: 3,
//       title: "Item 3",
//       content: "Each item will maintain proper spacing and alignment."
//     },
//     {
//       id: 4,
//       title: "Item 4",
//       content: "The grid uses Bootstrap's responsive column system."
//     },
//     {
//       id: 5,
//       title: "Item 5",
//       content: "On mobile, items will stack vertically (1 per row)."
//     },
//     {
//       id: 6,
//       title: "Item 6",
//       content: "On tablets, 2 items per row. On desktops, 3 items per row."
//     }
//   ];

//   return (
//     <div className="App d-flex flex-column min-vh-100">
//       <header>
//         <NavbarComponent />
//       </header>
//       <main>
//         <div>
//           <HeaderSteps totalSteps={5} />
//         </div>
//         <div className="container">
//           <GridComponent items={gridItems} />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
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
      </Routes>
    </Router>
  );
}

export default App;
