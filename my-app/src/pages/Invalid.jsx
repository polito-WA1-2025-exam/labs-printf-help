import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Invalid() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The URL you attempted to access does not exist.</p>
      <Button variant="primary" onClick={handleGoHome}>
        Take me home
      </Button>
    </div>
  );
}
