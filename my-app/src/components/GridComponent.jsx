import { Container, Row, Col } from 'react-bootstrap';
import CardItem from './CardItem';
import SingleChoiceCardItem from './SingleChoicesCardItem';

const GridComponent = (props) => {
  return (
    <Container className="my-5">
      <Row xs = {1} md = {2} lg = {3} className="g-4">
        {props.items.map((item) => (
          <Col lg={4} key={item.id}>
            {props.activeStep === 1 || props.activeStep === 2 ? (
              <SingleChoiceCardItem title={item.title} content={item.content} image={item.image} />
            ) : (props.activeStep === 3 || props.activeStep === 4 ? (
              <CardItem title={item.title} content={item.content} image={item.image} />
            ) : null)}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridComponent;