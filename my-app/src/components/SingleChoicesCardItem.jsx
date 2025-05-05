import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const GridItem = (props) => {
    return (
      <Card border={props.attribute == props.title && "success"} className="mb-4 shadow-sm border border-3" onClick={() => {props.setFunction(props.title)}} style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA5VjMKOaJ5BUIjOw2msxfF570rtO-Ov2Ntg&s" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
        {props.content}
        </Card.Text>
      </Card.Body>
      </Card>
    );
  };
  
  export default GridItem;