import React, { useEffect, useState } from 'react';
import { Divider, Grid } from '@material-ui/core';
import { Box, Button, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import DashedSlider from './DashedSlider';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';
import CircleButton from './CircleButton';
import SnapHorizontalSelectionComponent from "./SnapHorizontalSelectionComponent";

const IOSSwitch = styled(({ isMobile, isTablet, isDarkMode, ...props }) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, isMobile, isTablet, isDarkMode }) => ({
  width: isMobile ? '34px' : isTablet ? '47px' : '73px',
  height: isMobile ? '20px' : isTablet ? '26px' : '40px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: isMobile ? 2.5 : isTablet ? 3 : 4,
    margin: isMobile ,
    transitionDuration: '500ms',
    '&.Mui-checked': {
      transform: `translateX(${isMobile ? '14px' : isTablet ? '20px' : '30px'})`,
      color: `${isDarkMode ? 'black' : 'white'}`,
      '& + .MuiSwitch-track': {
        backgroundColor: `${isDarkMode ? 'white' : '#181547'}`,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: `${isDarkMode ? 0.2 : 0.5}`,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    backgroundColor: `${isDarkMode ? 'black' : 'white'}`,
    width: isMobile ? '14px' : isTablet ? '20px' : '30px',
    height: isMobile ? '14px' : isTablet ? '20px' : '30px',
  },
  '& .MuiSwitch-track': {
    borderRadius: isMobile ? '10px' : isTablet ? '13px' : '20px',
    backgroundColor: `${isDarkMode ? 'rgba(255,255,255, 0.2)' : '#9A98A3'}`,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const StageSection = ({ stageIndex, stageNameText, ageRangeText, 
  minSliderValue, maxSliderValue, isEnabled, 
  isMobile, isTablet,
  startingYears, years, contributions,
  reduxUpdateEnabled, reduxUpdateYears, reduxUpdateContributions }) => {
    
  const [isDarkMode, setIsDarkMode] = useState();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        setIsDarkMode(event.newValue === 'dark');
      }
    };

    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };    
  }, []);
    
  function enabledChanged(section, enabled) {
    reduxUpdateEnabled(section, enabled);
  };

  function yearChanged(section, years) {
    reduxUpdateYears(section, years);
  }

  function contributionsChanged(section, contributions) {
    reduxUpdateContributions(section, contributions);
  }

  function yearsNormalized() {
    if (isEnabled) {
      return years === 0 ? 5 : years;
    }

    return 0;
  }

  return (
    <Box
      width='100%'
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container width='100%' alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography
            className='montserrat-regular'
            fontSize={isMobile ? '20px' : '30px'}
          >
            {stageNameText}
          </Typography>
        </Grid>
        <Grid item>
          <IOSSwitch id={`toggle${stageIndex}`} checked={isEnabled} isMobile={isMobile} isTablet={isTablet} isDarkMode={isDarkMode} onChange={(e) => enabledChanged(stageIndex, e.target.checked)} />
        </Grid>
      </Grid>
      <Divider style={{ width: '100%', marginTop: 16, marginBottom: 16, backgroundColor:"#D6D6D6" }} />
      {isEnabled && (
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          gap={'10px'}
        >
          <Grid
            container
            width='100%'
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                className='montserrat-regular'
                fontSize={isMobile ? '16px' : '24px'}
              >
                {ageRangeText}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className='montserrat-bold'
                fontSize={isMobile ? '20px' : isTablet ? '30px' : '35px'}
              >
                {startingYears}-{startingYears+yearsNormalized()}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center">
            <Grid item>
              <Typography
                className='montserrat-regular'
                fontSize={isMobile ? '16px' : '24px'}
              >
                # of years in stage {stageIndex + 1}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className='montserrat-bold' fontSize={isMobile ? '20px' : isTablet ? '30px' : '35px'}>
                {yearsNormalized()}
              </Typography>
            </Grid>
          </Grid>
          <SnapHorizontalSelectionComponent
            min={1}
            max={10}
            reduxValue={yearsNormalized()}
            updateRedux={(selected) => yearChanged(stageIndex, selected)}
          />
          <Grid container
                justifyContent="space-between" alignItems="center"
                style={{
                  marginBottom:buildSpaceSizeCssString('regular', isMobile, isTablet)}}
          >
            <Grid item>
              <Typography
                className='montserrat-regular'
                fontSize={isMobile ? '16px' : '24px'}
              >
                Monthly savings
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className='montserrat-bold'
                fontSize={isMobile ? '20px' : isTablet ? '30px' : '35px'}
              >
                ${contributions}
              </Typography>
            </Grid>
          </Grid>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width={'100%'}
            marginBottom={isMobile ? '70px' : isTablet ? '100px' : '140px'}
          >
            <DashedSlider
              min={minSliderValue}
              max={maxSliderValue}
              step={100}
              reduxValue={contributions}
              updateRedux={(newValue) => contributionsChanged(stageIndex, newValue)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StageSection;
