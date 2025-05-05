import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react';


const GridItem = (props) => {
  return (
    <Card border={props.attribute.filter((item) => item == props.title).length > 0 && "success"} className="mb-4 shadow-sm border border-3">
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA5VjMKOaJ5BUIjOw2msxfF570rtO-Ov2Ntg&s" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.content}
        </Card.Text>
        <Container className="d-flex justify-content-center">
          <Row>
            <Col>
              <Button variant="light" className="me-2" size='lg' onClick={() => {
                const index = props.attribute.indexOf(props.title);
                if (index > -1) {
                  const newAttribute = [...props.attribute];
                  newAttribute.splice(index, 1);
                  props.setFunction(newAttribute);
                }
              }}>
                <i className="bi bi-dash-circle-fill"></i>
              </Button>
            </Col>
            <Col>
              <h2 className="text-center">{props.attribute.filter((item) => item == props.title).length}</h2>
            </Col>
            <Col>
              <Button variant="light" className="me-2" size='lg' onClick={() => props.setFunction([...props.attribute, props.title])}>
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