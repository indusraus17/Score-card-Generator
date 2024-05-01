// ParentComponent.js
// ParentComponent.js
import React, { useState } from 'react';
import ScoreCardForm from './ScoreCardForm'; // Import the ScoreCardForm component

const ParentComponent = () => {
  const handleSubmit = (data) => {
    // Handle form submission here
    console.log("Form data:", data);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ScoreCardForm onSubmit={handleSubmit} /> {/* Pass the onSubmit function */}
    </div>
  );
};

export default ParentComponent;
