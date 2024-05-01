
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ScoreCardForm from './components/ScoreCardForm';
import GradingScaleTable from './components/GradingScaleTable';

const App = () => {
  const handleSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Container>
      <ScoreCardForm onSubmit={handleSubmit} />
      {/* <GradingScaleTable/> */}
    </Container>
  );
};

export default App;

