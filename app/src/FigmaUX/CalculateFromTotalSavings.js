import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Box, Input } from '@mui/material';
import { Slider } from '@material-ui/core';
import StageSection from './StageSection';
import CircleSlider from './Components/CircleSlider';
import StartingAmountSelection from './Components/StartingAmountSelection';
import { currentDayFormatted } from './Global/Global';

// Media
import money from '../Media/money.svg'
import donation from '../Media/donation.svg'

// Redux
import { 
  updateStartingSavings, 
  updateStartingAge,
  updateDesiredResult
} from '../redux/initialValuesReducer';

import {
  updateMonthlyContribution as updateFirstDecadeMonthlyContribution,
  updateAge as updateFirstDecadeAge,
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
  updateEnabled as updateFirstDecadeEnabled,
} from '../redux/decadeOneReducer';

import {
  updateMonthlyContribution as updateSecondDecadeMonthlyContribution,
  updateAge as updateSecondDecadeAge,
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
  updateEnabled as updateSecondDecadeEnabled,
} from '../redux/decadeTwoReducer';

import {
  updateMonthlyContribution as updateThirdDecadeMonthlyContribution,
  updateAge as updateThirdDecadeAge,
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
  updateEnabled as updateThirdDecadeEnabled,
} from '../redux/decadeThreeReducer';

const CalculateFromTotalSavings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    startingSavings,
    startingAge,
    desiredResult,
  } = useSelector(
    (state) => state.initialPage
  );
  
  const {
    monthlyContribution: decadeOneMonthlyContribution,
    age: decadeOneAge,
    totalDecadeSavings: decadeOneTotalSavings,
    enabled: decadeOneEnabled,
  } = useSelector(
    (state) => state.decadeOnePage
  );

  const {
    monthlyContribution: decadeTwoMonthlyContribution,
    age: decadeTwoAge,
    totalDecadeSavings: decadeTwoTotalSavings,
    enabled: decadeTwoEnabled,
  } = useSelector(
    (state) => state.decadeTwoPage
  );

  const {
    monthlyContribution: decadeThreeMonthlyContribution,
    age: decadeThreeAge,
    totalDecadeSavings: decadeThreeTotalSavings,
    enabled: decadeThreeEnabled,
  } = useSelector(
    (state) => state.decadeThreePage
  );

  const handleUpdateStartingSavings = (newValue) => {
    dispatch(updateStartingSavings(newValue));
  };

  const nextPage = () => {
    navigate(`/???`);
  };

  return (
    <Box gap={8}>
      <Box sx={{ m: 2, justifyContent: 'flex-start' }}>
        <Typography variant="h5">Calculate from total savings</Typography>
        <Typography variant="body2" sx={{ fontSize: 'var(--font-size-small)' }}>
          {currentDayFormatted()}
        </Typography>
      </Box>
      <Box gap={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box>
          <Grid container direction='column' gap={2} alignItems="center">
            <Typography variant="h5">Starting amount</Typography>
            <StartingAmountSelection onUpdateStartingSavings={handleUpdateStartingSavings}/>
            <Grid item sx={{ width:'100%' }} marginTop={4}>
              <Slider
                min={5000}
                max={20000}
                // value={value}
                // onChange={handleChange}
                step={100}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={4}>
          <Typography variant="h5" marginBottom={2}>Your current age</Typography>
          <CircleSlider min={12} max={55} initialValue={18}></CircleSlider>
          <Typography variant="h5" marginTop={4}>How much money do you want?</Typography>
          <Grid container direction="column" spacing={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <Grid item>
              <Button variant="contained" onClick={() => {/* toggleActiveMillionButton(0); targetMillion(1000000) */}} sx={{ width: '100%' }}>
                $1,000,000
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => {/* toggleActiveMillionButton(1); targetMillion(3000000) */}} sx={{ width: '100%' }}>
                $3,000,000
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => {/* toggleActiveMillionButton(2); targetMillion(5000000) */}} sx={{ width: '100%' }}>
                $5,000,000
              </Button>
            </Grid>
          </Grid>

        </Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">
            Your savings plan is divided <br />  
          </Typography>
          <Typography variant="h6">
            into <span style={{ color: '#33CBCC' }}>three stages.</span>
          </Typography>
          <Typography variant="body1" marginTop={2}>
            As you make more money you save more
          </Typography>
          <Typography variant="body1">
            money in each stage.
          </Typography>
        </Box>
      </Box>
      <Box className="section padded-section" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ m: 2, marginTop: 8}}>
        <Box>
          <Typography variant="h5" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginBottom:4 }}>
            Your investment will<br /> be worth
          </Typography>
          <Typography variant="h2" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>$1,000,174</Typography>
        </Box>
        <Typography variant="body2" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>(over 40 years)</Typography>
      </Box>
      <Box gap={4} sx={{ m:2, marginTop:8, display: 'flex', flexDirection: 'column' }}>
        <StageSection
          stageIndex={0}
          stageNameText="Stage One"
          ageRangeText="Your stage one age range"
          minSliderValue={5000}
          maxSliderValue={20000}
        />
        <StageSection
          stageIndex={1}
          stageNameText="Stage Two"
          ageRangeText="Your stage two age range"
          minSliderValue={6000}
          maxSliderValue={25000}
        />
        <StageSection
          stageIndex={2}
          stageNameText="Stage Three"
          ageRangeText="Your stage three age range"
          minSliderValue={6000}
          maxSliderValue={25000}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:8 }}>
        <Box display="flex" flexDirection="row" gap={8}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={money} alt="Total Interest Earned" width="100rem" />
            <Typography>Total Interest Earned</Typography>
            <Typography data-js-total></Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={donation} alt="Total Contributions" width="100rem" />
            <Typography>Total Contributions</Typography>
            <Typography data-js-contributions-sum></Typography>
          </Box>
        </Box>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="linechart"></canvas>
      </Box>
      <Box id="piechart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="piechart"></canvas>
      </Box>
    </Box>
  );
}

export default CalculateFromTotalSavings;