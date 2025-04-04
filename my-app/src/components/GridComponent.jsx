import { Container, Row, Col } from 'react-bootstrap';
import GridItem from './GridItem';

const GridComponent = ({ items }) => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Responsive Grid Layout</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map((item) => (
          <Col key={item.id}>
            <GridItem title={item.title} content={item.content} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridComponent;