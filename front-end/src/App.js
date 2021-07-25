import React from 'react';
import Header from './components/header';
//import Bar from './components/bar';
import Rodape from './components/rodape';
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './styles.css'

const App = () => (
  <div className="App">
    <Header />
    {/* <Bar /> */}
    <Container>
      <Routes />
      <Rodape />
    </Container>
  </div>
);

export default App;
