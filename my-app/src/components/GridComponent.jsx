import { Container, Row, Col } from 'react-bootstrap';
import CardItem from './CardItem';

const GridComponent = ({ items }) => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Pick your Poison</h1>
      <Row xs = {1} md = {2} lg = {3} className="g-4">
        {items.map((item) => (
          <Col lg={4} key={item.id}>
            <CardItem title={item.title} content={item.content} image = {item.image}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridComponent;