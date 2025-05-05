import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import logo from '../../assets/pokeball.png';

const NavbarComponent = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();  // Initialize navigate

  // Function to handle Login button click
  const handleLoginClick = () => {
    navigate('/login');  // Redirect to login page
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          PokeBowl
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/order">Place an order</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <button type="button" className="btn btn-dark" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <button type="button" className="btn btn-danger" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
