import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Store from './store';
import Calendar from './components/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Store>
      <Container>
        <Row>
          <Calendar />
        </Row>
      </Container>
    </Store>
  );
};

export default App;



