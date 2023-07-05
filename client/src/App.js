import React from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

const App = () => {

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App