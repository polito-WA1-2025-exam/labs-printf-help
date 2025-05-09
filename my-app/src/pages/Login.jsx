import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function Login(props) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    props.onLogin();         // Set login state
    navigate('/');     // Navigate to home (or any other page)
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      <LoginForm handleLoginClick={handleLoginClick}/>
      {/* <button className="btn btn-primary mt-3" onClick={handleLoginClick}>
        Log In
      </button> */}
    </div>
  );

}
