import React from 'react';
import { Navbar } from "components";
import { HashRouter as Router } from 'react-router-dom';

import { Container } from "./styled/Container";

import "./App.css";
import { GlobalStyle } from 'styled/Global';

function App() {
  return (
    <Container>
      <Router >
        <GlobalStyle />
        <Navbar />
      </Router>
    </Container>
  );
}

export default App;


setInterval(() => {

}, 3000);