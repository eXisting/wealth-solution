import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { Box, Button, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import DashedSlider from './DashedSlider';
import { buildFontSizeCssString, buildSpaceSizeCssString } from '../Global/CssStrings';
import CircleButton from './CircleButton';

const IOSSwitch = styled(({ isMobile, isTablet, ...props }) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, isMobile, isTablet }) => ({
  width: isMobile ? '34px' : isTablet ? '47px' : '73px',
  height: isMobile ? '20px' : isTablet ? '26px' : '40px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: isMobile ? 2.5 : isTablet ? 3 : 4,
    margin: isMobile ,
    transitionDuration: '500ms',
    '&.Mui-checked': {
      transform: `translateX(${isMobile ? '14px' : isTablet ? '20px' : '30px'})`,
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#181547',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
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
    width: isMobile ? '14px' : isTablet ? '20px' : '30px',
    height: isMobile ? '14px' : isTablet ? '20px' : '30px',
  },
  '& .MuiSwitch-track': {
    borderRadius: isMobile ? '10px' : isTablet ? '13px' : '20px',
    backgroundColor: '#9A98A3',
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
      return years === 0 ? 1 : years;
    }

    return 0;
  }

  return (
    <Box width='100%' display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Grid container width='100%' alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography className='montserrat-regular' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
            {stageNameText}
          </Typography>
        </Grid>
        <Grid item>
          <IOSSwitch id={`toggle${stageIndex}`} checked={isEnabled} isMobile={isMobile} isTablet={isTablet} onChange={(e) => enabledChanged(stageIndex, e.target.checked)} />
        </Grid>
      </Grid>
      <Divider style={{ width: '100%', marginTop: 16, marginBottom: 16, backgroundColor:"black" }} />
      {isEnabled && (
        <>
        <Grid container width='100%' justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography className='montserrat-regular' fontSize={!isMobile && !isTablet ? '30px' : buildFontSizeCssString('medium', isMobile, isTablet)}>
                {ageRangeText}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className='montserrat-bold' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
                {startingYears}-{startingYears+yearsNormalized()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography className='montserrat-regular' fontSize={!isMobile && !isTablet ? '30px' : buildFontSizeCssString('medium', isMobile, isTablet)}>
                # of years in stage {stageIndex + 1}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className='montserrat-bold' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
                {yearsNormalized()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' direction='row' justifyContent='center' 
            style={{marginTop:buildSpaceSizeCssString('regular', isMobile, isTablet), gap: isMobile ? '26px' : isTablet ? '45px' : '68px'}}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <Box key={number} display="flex" flexDirection='column' textAlign={'center'}>
                <Box textAlign={'center'} marginBottom='2px' >
                  <Typography className='montserrat-medium'
                    fontSize={isMobile ? '12px' : isTablet ? '18px' : '26px'}
                    color="#666666"
                  >
                    {number}
                  </Typography>
                </Box>
                <CircleButton
                  isMobile={isMobile}
                  isTablet={isTablet}
                  selected={yearsNormalized() === number}
                  width={isMobile ? '38px' : isTablet ? '72px' : '100px'}
                  height={isMobile ? '38px' : isTablet ? '72px' : '100px'}
                  mainBackgroundColor={'#FFFFFF'}
                  mainColorSelected={'#FFFFFF'}
                  secondaryColor={'#F7F7F7'}
                  secondaryColorSelected={'var(--main-color)'}
                  onClick={() => yearChanged(stageIndex, number)}
                />
              </Box>
            ))}
          </Grid>
          <Grid container
                justifyContent="space-between" alignItems="center"
                style={{marginTop:buildSpaceSizeCssString('medium', isMobile, isTablet),
                  marginBottom:buildSpaceSizeCssString('medium', isMobile, isTablet)}}
          >
            <Grid item>
              <Typography className='montserrat-regular' fontSize={!isMobile && !isTablet ? '30px' : buildFontSizeCssString('medium', isMobile, isTablet)}>
                Monthly savings
              </Typography>
            </Grid>
            <Grid item>
              <Typography className='montserrat-bold' fontSize={isMobile ? '20px' : isTablet ? '30px' : '40px'}>
                ${contributions}
              </Typography>
            </Grid>
          </Grid>
          <DashedSlider 
            min={minSliderValue} 
            max={maxSliderValue} 
            step={100}
            reduxValue={contributions}
            updateRedux={(newValue) => contributionsChanged(stageIndex, newValue)}
          />
        </>
      )}
    </Box>
  );
};

export default StageSection;
