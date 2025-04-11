import {Button, Card, Container} from 'react-bootstrap';

const GridItem = ({ title, content }) => {
    return (
      // <div className="grid-item">
      //   <h3>{title}</h3>
      //   <p>{content}</p>
      // </div>

      <Card className="mb-4 shadow-sm">
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA5VjMKOaJ5BUIjOw2msxfF570rtO-Ov2Ntg&s" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {content}
          </Card.Text>
          <Container className="d-flex justify-content-center">
            <Button variant="success" className="me-2">
              <i className="bi bi-plus-circle-fill"></i>
            </Button>
          </Container>
        </Card.Body>
      </Card>
    );
  };
  
  export default GridItem;