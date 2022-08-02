import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

export default function StepCheck({ activeStep = 0 }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{margin :'30px 0px'}} >
    {['Login' , 'Shippning Address ' , 'Pay' , "Place Order" ].map(x=>(
        <Step key={x}>
            <StepLabel>{x} </StepLabel>
        </Step>
    ))}
    </Stepper>
  );
}

