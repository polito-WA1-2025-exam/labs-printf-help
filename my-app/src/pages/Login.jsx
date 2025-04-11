import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onLogin();         // Set login state
    navigate('/');     // Navigate to home (or any other page)
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      <button className="btn btn-primary mt-3" onClick={handleLoginClick}>
        Log In
      </button>
    </div>
  );

}
