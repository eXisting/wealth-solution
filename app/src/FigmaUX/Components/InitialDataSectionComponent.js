import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StartingAmountSelection from './StartingAmountSelection';
import DashedSlider from './DashedSlider';

import '../css/components.css';

const InitialDataSectionComponent = ({startingSavings, startingAge, reduxStartingSavingsUpdate, reduxStartingAgeUpdate}) => {
  return (
    <>
      <Grid container direction='column' gap={2} alignItems="center">
        <Typography variant="h5">Starting amount</Typography>
        <StartingAmountSelection onUpdateStartingSavings={reduxStartingSavingsUpdate}/>
        <DashedSlider
          min={5000}
          max={20000}
          reduxValue={startingSavings}
          updateRedux={reduxStartingSavingsUpdate}
        />
      </Grid>
      <Box width='100%' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={4}>
        <Typography variant="h5" marginBottom={2}>Your current age</Typography>
        <DashedSlider
          min={12}
          max={50}
          reduxValue={startingAge}
          updateRedux={reduxStartingAgeUpdate}
        />
      </Box>
    </>
  );
};

export default InitialDataSectionComponent;