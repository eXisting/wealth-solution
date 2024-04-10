import React from 'react';
import { Typography, Switch, Divider, Slider, Box, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const StageSection = ({ stageIndex, stageNameText, ageRangeText, minSliderValue, maxSliderValue, isEnabled, reduxUpdate }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(reduxUpdate(!isEnabled));
  };

  return (
    <Box m={2} sx={{ display:'flex', flexDirection: 'column' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{stageNameText}</Typography>
        </Grid>
        <Grid item>
          <Switch id={`toggle${stageIndex}`} checked={isEnabled} onChange={handleToggle} />
        </Grid>
      </Grid>
      <Divider style={{ width: '100%', marginBottom: 16 }} />
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
          <Box id={`years-number-${stageIndex}-buttons-container`} display="flex" flexDirection="row"></Box>
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
