import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Calendar from './components/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Container>
      <Row>
        <Calendar />
      </Row>
    </Container>
  );
};

export default App;



