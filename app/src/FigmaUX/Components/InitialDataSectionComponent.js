import React, { useState } from 'react';
import {Box, createTheme, Grid, Typography, useMediaQuery, useTheme} from '@mui/material';
import StartingAmountSelection from './StartingAmountSelection';
import DashedSlider from './DashedSlider';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';

import '../css/layoutSpaces.css';
import '../css/fonts.css';
import SnapHorizontalSelectionComponent from './SnapHorizontalSelectionComponent';

const InitialDataSectionComponent = ({startingSavings, startingAge, isMobile, isTablet, reduxStartingSavingsUpdate, reduxStartingAgeUpdate}) => {
  return (
    <>
      {isMobile || isTablet ? (
          <>
            <Box
              width='100%'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom:buildSpaceSizeCssString(!isMobile && !isTablet ? 'regular' : 'big', isMobile, isTablet) }}
            >
              <Typography
                className='montserrat-regular'
                fontSize={isMobile ? '20px' : '24px'}
                textAlign={'center'}
                marginBottom={buildSpaceSizeCssString('regular', isMobile, isTablet)}
              >
                How much do you have saved today?
              </Typography>
              <StartingAmountSelection
                marginBottom={isMobile ? '20px' : '40px'}
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
            <Box
              width='100%'
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              //gap={4}
              marginTop={'30px'}
            >
              <Typography
                className='montserrat-regular'
                fontSize={isMobile ? '20px' : '24px'}
                marginBottom={buildSpaceSizeCssString('regular', isMobile, isTablet)}
              >
                Your current age
              </Typography>
              <SnapHorizontalSelectionComponent min={12} max={50} reduxValue={startingAge} updateRedux={reduxStartingAgeUpdate} />
            </Box>
          </>
        ) : (
        <Box
          display={'flex'}
          flexDirection={'row'}
          width='100%'
        >
          <Box
            width='100%'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom:buildSpaceSizeCssString('regular', isMobile, isTablet) }}
          >
            <Typography
              className='montserrat-regular'
              fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
              marginBottom={buildSpaceSizeCssString('small', isMobile, isTablet)}
            >
              How much do you have saved today?
            </Typography>
            <StartingAmountSelection
              marginBottom={buildSpaceSizeCssString('regular', isMobile, isTablet)}
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
          <Box width='50%' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={4}>
            <Typography className='montserrat-regular'
                        fontSize={buildFontSizeCssString('regular', isMobile, isTablet)}
                        marginBottom={buildSpaceSizeCssString('smal', isMobile, isTablet)}
            >
              Your current age
            </Typography>
            <SnapHorizontalSelectionComponent min={12} max={50} reduxValue={startingAge} updateRedux={reduxStartingAgeUpdate} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default InitialDataSectionComponent;