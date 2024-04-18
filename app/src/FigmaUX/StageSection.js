import React from 'react';
import { Typography, Divider, Box, Grid } from '@material-ui/core';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import DashedSlider from './Components/DashedSlider';

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

const StageSection = ({ stageIndex, stageNameText, ageRangeText, 
  minSliderValue, maxSliderValue, isEnabled, 
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
    <Box sx={{ display:'flex', flexDirection: 'column' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{stageNameText}</Typography>
        </Grid>
        <Grid item>
          <IOSSwitch id={`toggle${stageIndex}`} checked={isEnabled} onChange={(e) => enabledChanged(stageIndex, e.target.checked)} />
        </Grid>
      </Grid>
      <Divider style={{ width: '100%', marginTop: 16, marginBottom: 16, backgroundColor:"black" }} />
      {isEnabled && (
        <>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">{ageRangeText}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{startingYears}-{startingYears+yearsNormalized()}</Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6"># of years in stage {stageIndex + 1}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{yearsNormalized()}</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' direction='row'>
            <DashedSlider 
              min={1} 
              max={5} 
              step={1}
              reduxValue={yearsNormalized()}
              updateRedux={(newValue) => yearChanged(stageIndex, newValue) }
            />
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Monthly savings</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{contributions}</Typography>
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
