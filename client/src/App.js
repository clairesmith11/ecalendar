import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Calendar from './components/Calendar';
import Events from './components/Events';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Calendar />
        </Col>
        <Col>
          <Events />
        </Col>
      </Row>

    </Container>
  );
};

export default App;



