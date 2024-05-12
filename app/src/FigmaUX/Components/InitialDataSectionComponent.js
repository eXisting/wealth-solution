import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StartingAmountSelection from './StartingAmountSelection';
import DashedSlider from './DashedSlider';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/layoutSpaces.css';
import '../css/fonts.css';
import SnapHorizontalSelectionComponent from './SnapHorizontalSelectionComponent';

const InitialDataSectionComponent = ({startingSavings, startingAge, isMobile, isTablet, reduxStartingSavingsUpdate, reduxStartingAgeUpdate}) => {
  return (
    <>
      <Box width='100%' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet) }}>
        <Typography className='montserrat-regular' fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}>
          How much do you have saved today?
        </Typography>
        <StartingAmountSelection
            marginBottom={buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet)}
            isMobile={isMobile}
            isTablet={isTablet}
            maxValue={20000}
            onUpdateStartingSavings={reduxStartingSavingsUpdate}
        />
        <DashedSlider
          min={5000}
          max={20000}
          reduxValue={startingSavings}
          updateRedux={reduxStartingSavingsUpdate}
        />
      </Box>
      <Box width='100%' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={4}>
        <Typography className='montserrat-regular' 
          fontSize={buildFontSizeCssString(isMobile ? 'strong' : 'medium', isMobile, isTablet)}
          marginBottom={buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'medium', isMobile, isTablet)}
        >
          Your current age
        </Typography>
        <SnapHorizontalSelectionComponent min={12} max={50} reduxValue={startingAge} updateRedux={reduxStartingAgeUpdate} />
      </Box>
    </>
  );
};

export default InitialDataSectionComponent;