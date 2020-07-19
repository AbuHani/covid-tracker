import React from 'react';
import { Navbar } from "components";
import { BrowserRouter } from 'react-router-dom';

import { Container } from "./styled/Container";

import "./App.css";
import { GlobalStyle } from 'styled/Global';

function App() {
  return (
    <Container>
      <BrowserRouter >
        <GlobalStyle />
        <Navbar />
      </BrowserRouter>
    </Container>
  );
}

export default App;


setInterval(() => {
  
}, 3000);