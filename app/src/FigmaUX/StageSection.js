import React, { useEffect, useState } from 'react';
import { Typography, Divider, Slider, Box, Grid } from '@material-ui/core';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

import './css/containers.css'

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '500ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
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
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#9A98A3',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const StageSection = ({ stageIndex, stageNameText, ageRangeText, minSliderValue, maxSliderValue, isEnabled, reduxUpdateYears, reduxUpdateContributions }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(reduxUpdateYears(!isEnabled));
  };

  function yearChanged(section, years) {
    dispatch(reduxUpdateContributions(years))
  }

  return (
    <Box sx={{ display:'flex', flexDirection: 'column' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{stageNameText}</Typography>
        </Grid>
        <Grid item>
          <IOSSwitch id={`toggle${stageIndex}`} checked={isEnabled} onChange={handleToggle} />
        </Grid>
      </Grid>
      <Divider style={{ width: '100%', marginTop: 16, marginBottom: 16, backgroundColor:"black" }} />
      {isEnabled && (
        <>
          <Typography variant="h6">{ageRangeText}</Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6"># of years in stage {stageIndex + 1}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" id={`years-number-${stageIndex}`}></Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' direction='row'>
            
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Monthly savings</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" id={`contribution-info-${stageIndex}`}></Typography>
            </Grid>
          </Grid>
          <Slider id={`contribution${stageIndex}Input`} min={minSliderValue} max={maxSliderValue} className="sectioned-range-slider" />
        </>
      )}
    </Box>
  );
};

export default StageSection;
