import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const GridItem = ({ title, content, image }) => {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA5VjMKOaJ5BUIjOw2msxfF570rtO-Ov2Ntg&s" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {content}
          </Card.Text>
          <Container className="d-flex justify-content-center">
            <Row>
              <Col>
                <Button variant="light" className="me-2" size='lg'>
                  <i className="bi bi-dash-circle-fill"></i>
                </Button>
              </Col>
              <Col>
                <h2 className="text-center">0</h2>
              </Col>
              <Col>
                <Button variant="light" className="me-2" size='lg'>
                  <i className="bi bi-plus-circle-fill"></i>
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  };
  
  export default GridItem;