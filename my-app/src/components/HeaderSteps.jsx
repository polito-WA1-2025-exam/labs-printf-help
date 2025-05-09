import React, { useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';

const HeaderSteps = (props) => {
  const renderSteps = () => {
    return Array.from({ length: props.totalSteps }, (_, index) => {
      const step = index + 1;
      const isActive = step === props.activeStep;

      return (
        <Button
          key={step}
          variant={isActive ? 'primary' : 'secondary'}
          className="rounded-circle mx-2"
          style={{
            width: '50px',
            height: '50px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
          onClick={() => props.setActiveStep(step)}
        >
          {step}
        </Button>
      );
    });
  };

  return (
    <Navbar bg="dark" className="justify-content-center">
        {renderSteps()}
    </Navbar>
  );
};

export default HeaderSteps;
